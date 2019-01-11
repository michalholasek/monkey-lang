import { Token, TokenKind } from '../../lexer/types';
import { Expression, ExpressionValue } from '../ast/types';
import {
  AssertionResult,
  ExpressionParseResult,
  Precedence
} from '../types';

import { createAssertionResult } from './helpers';

export function assertExpression(): AssertionResult {
  return createAssertionResult();
}

export function parseStatementExpression(tokens: Token[]): Expression {
  return parseExpression(tokens, 0, Precedence.Lowest).expression;
}

function createExpression(tokens: Token[]): Expression {
  return { tokens };
}

function isPrefixToken(token: Token): boolean {
  return token.kind === TokenKind.Bang || token.kind === TokenKind.Minus;
}

function parseExpression(tokens: Token[], cursor: number, precedence: number): ExpressionParseResult {
  let leftExpressionParseResult = parsePrefixExpression(tokens, cursor);
  let nextPrecedence = Precedence.Lowest;

  cursor = leftExpressionParseResult.cursor;

  while (cursor < tokens.length && precedence <= nextPrecedence) {
    leftExpressionParseResult = parseInfixExpression(tokens, cursor, leftExpressionParseResult.expression);
    cursor = leftExpressionParseResult.cursor;
  }

  return leftExpressionParseResult;
}

function parseInfixExpression(tokens: Token[], cursor: number, left: Expression): ExpressionParseResult {
  let expression = createExpression(tokens);
  let rightExpressionParseResult = parseExpression(tokens, cursor + 1, Precedence.Lowest);

  expression.left = left;
  expression.operator = tokens[cursor];
  expression.right = rightExpressionParseResult.expression;

  return {
    cursor: rightExpressionParseResult.cursor,
    expression
  };
}

function parsePrefixExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let expression = createExpression(tokens);
  let prefix = tokens[cursor];
  let nextCursor = 0;

  if (isPrefixToken(prefix)) {
    expression.left = {
      operator: prefix,
      tokens: tokens.slice(cursor, cursor + 2),
      value: parseExpressionValue(tokens[cursor + 1])
    };
    nextCursor = cursor + 2;
  } else {
    expression.value = parseExpressionValue(prefix);
    expression.tokens = tokens.slice(cursor, cursor + 1);
    nextCursor = cursor + 1;
  }

  return {
    cursor: nextCursor,
    expression
  };
}

function parseExpressionValue(token: Token): ExpressionValue {
  return token.kind === TokenKind.Int ? parseInt(token.literal, 10) : token.literal;
}
