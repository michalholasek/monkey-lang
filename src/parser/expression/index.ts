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
  let expressionTokens = tokens.filter(token => {
    let isTokenValid = true;

    switch (token.kind) {
      case TokenKind.LeftParenthesis:
      case TokenKind.RightParenthesis:
        isTokenValid = false;
    }

    return isTokenValid;
  });

  let cursor = 0;

  return parseExpression(expressionTokens, cursor, Precedence.Lowest).expression;
}

function createExpression(tokens: Token[]): Expression {
  return { tokens };
}

function determineNextOperatorPrecedence(tokens: Token[], cursor: number, precedence: Precedence) {
  let nextToken = tokens[cursor + 1];
  let nextPrecedence;

  if (nextToken) {
    nextPrecedence = OperatorPrecedences[nextToken.kind];
  }

  return nextPrecedence || precedence;
}

function determineOperatorPrecedence(expression: Expression): Precedence {
  let precedence;

  if (expression.operator) {
    precedence = OperatorPrecedences[expression.operator.kind];
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
  let leftExpressionParseResult = parsePrefixExpression(tokens, cursor, precedence);
  let nextPrecedence = determineNextOperatorPrecedence(tokens, cursor, precedence);

  cursor = leftExpressionParseResult.cursor;

  while (cursor < tokens.length && precedence <= nextPrecedence) {
    leftExpressionParseResult = parseInfixExpression(tokens, cursor, leftExpressionParseResult.expression);
    cursor = leftExpressionParseResult.cursor;
  }

  return leftExpressionParseResult;
}

function parseInfixExpression(tokens: Token[], cursor: number, left: Expression): ExpressionParseResult {
  let expression = createExpression(tokens);
  let currentPrecedence = determineOperatorPrecedence(left);
  let rightExpressionParseResult = parseExpression(tokens, cursor + 1, currentPrecedence);

  expression.left = left;
  expression.operator = tokens[cursor];
  expression.right = rightExpressionParseResult.expression;
  expression.tokens = left.tokens.concat([expression.operator]).concat(expression.right.tokens);

  return {
    cursor: rightExpressionParseResult.cursor,
    expression
  };
}

function parsePrefixExpression(tokens: Token[], cursor: number, precedence: Precedence): ExpressionParseResult {
  let prefix = tokens[cursor];
  let hasPrefix = isPrefixToken(prefix);
  let nextToken = tokens[cursor + 1];
  let hasImmediateValue = nextToken ? isNextTokenImmediateValue(nextToken) : false;
  let noOfTokens = 0;
  let expression;
  let expressionTokens;

  if (!hasPrefix) { // Base case, immediate value
    noOfTokens = 1;
    expressionTokens = tokens.slice(cursor, cursor + noOfTokens);
    expression = createExpression(expressionTokens);
    expression.value = parseExpressionValue(prefix);
    expression.tokens = expressionTokens;
  } else if (hasPrefix && hasImmediateValue) {
    noOfTokens = 2;
    expressionTokens = tokens.slice(cursor, cursor + noOfTokens);
    expression = createExpression(expressionTokens);
    expression.left = {
      operator: prefix,
      tokens: expressionTokens,
      value: parseExpressionValue(expressionTokens[1])
    };
  } else {
    let expressionParseResult = parseExpression(tokens, cursor + 1, precedence);
    noOfTokens = expressionParseResult.cursor + 1;
    expressionTokens = tokens.slice(cursor, cursor + noOfTokens);
    expression = createExpression(expressionTokens);
    expression.operator = prefix;
    expression.left = expressionParseResult.expression.left;
  }

  return {
    cursor: cursor + noOfTokens,
    expression
  };
}

function parseExpressionValue(token: Token): ExpressionValue {
  return token.kind === TokenKind.Int ? parseInt(token.literal, 10) : token.literal;
}
