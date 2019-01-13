import { Token, TokenKind } from '../../lexer/types';
import { Expression, ExpressionValue } from '../ast/types';
import {
  AssertionResult,
  ExpressionParseResult,
  OperatorPrecedences,
  Precedence
} from '../types';

import { createAssertionResult } from './helpers';

export function assertExpression(): AssertionResult {
  return createAssertionResult();
}

export function parseStatementExpression(tokens: Token[]): Expression {
  let cursor = 0;

  return parseExpression(tokens, cursor, Precedence.Lowest).expression;
}

function createExpression(tokens: Token[]): Expression {
  return { tokens };
}

function determineOperatorPrecedence(operator: Token): Precedence {
  let precedence;

  if (operator) {
    precedence = OperatorPrecedences[operator.kind];
  }

  return precedence || Precedence.Lowest;
}

function isNextTokenImmediateValue(token: Token): boolean {
  return token.kind === TokenKind.Int || token.kind === TokenKind.Identifier;
}

function isPrefixToken(token: Token): boolean {
  return token.kind === TokenKind.Bang || token.kind === TokenKind.Minus;
}

function parseExpression(tokens: Token[], cursor: number, precedence: Precedence): ExpressionParseResult {
  let leftExpressionParseResult = parsePrefixExpression(tokens, cursor);
  let nextPrecedence = leftExpressionParseResult.nextPrecedence;

  cursor = leftExpressionParseResult.cursor;

  while (cursor < tokens.length && precedence < nextPrecedence) {
    leftExpressionParseResult = parseInfixExpression(tokens, leftExpressionParseResult.cursor, leftExpressionParseResult.expression);
    nextPrecedence = leftExpressionParseResult.nextPrecedence;
    cursor = leftExpressionParseResult.cursor;
  }

  return leftExpressionParseResult;
}

function parseInfixExpression(tokens: Token[], cursor: number, left: Expression): ExpressionParseResult {
  let operator = tokens[cursor];
  let currentPrecedence = determineOperatorPrecedence(operator);

  let rightExpressionParseResult = parseExpression(tokens, cursor + 1, currentPrecedence);

  let expression = createExpression(left.tokens.concat([operator]).concat(rightExpressionParseResult.expression.tokens));
  expression.left = left;
  expression.operator = operator;
  expression.right = rightExpressionParseResult.expression;

  return {
    expression,
    cursor: rightExpressionParseResult.cursor,
    nextPrecedence: rightExpressionParseResult.nextPrecedence
  };
}

function parsePrefixExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let currentToken = tokens[cursor];
  let nextToken = tokens[cursor + 1];
  let hasPrefix = isPrefixToken(currentToken);
  let hasImmediateValue = nextToken ? isNextTokenImmediateValue(nextToken) : false;
  let expression;

  let expressionParseResult;

  if (!hasPrefix) {
    expression = createExpression([currentToken]);
    expression.value = parseExpressionValue(currentToken);
    expressionParseResult = {
      cursor: cursor + 1,
      expression,
      nextPrecedence: determineOperatorPrecedence(nextToken)
    };
  } else if (hasPrefix && hasImmediateValue) {
    expression = createExpression([currentToken, nextToken]);
    expression.operator = currentToken;
    expression.value = parseExpressionValue(nextToken);

    expressionParseResult = {
      cursor: cursor + 2,
      expression,
      nextPrecedence: determineOperatorPrecedence(tokens[cursor + 2])
    };
  } else {
    let prefixExpressionParseResult = parseExpression(tokens, cursor + 1, Precedence.Prefix);

    let left = createExpression([currentToken]);
    left.operator = currentToken;

    expression = createExpression([currentToken].concat(prefixExpressionParseResult.expression.tokens));
    expression.left = left;
    expression.right = prefixExpressionParseResult.expression;

    expressionParseResult = {
      cursor: cursor + prefixExpressionParseResult.cursor,
      expression,
      nextPrecedence: prefixExpressionParseResult.nextPrecedence
    };
  }

  return expressionParseResult;
}

function parseExpressionValue(token: Token): ExpressionValue {
  return token.kind === TokenKind.Int ? parseInt(token.literal, 10) : token.literal;
}
