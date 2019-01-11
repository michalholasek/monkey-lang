import { Token, TokenKind } from '../../lexer/types';
import { Expression, ExpressionValue } from '../ast/types';
import { AssertionResult, ExpressionParseResult } from '../types';

import { createAssertionResult } from './helpers';

export function assertExpression(): AssertionResult {
  return createAssertionResult();
}

export function parseStatementExpression(tokens: Token[]): Expression {
  return parseExpression(tokens, 0).expression;
}

function createExpression(tokens: Token[]): Expression {
  return { tokens };
}

function isPrefixToken(token: Token): boolean {
  return token.kind === TokenKind.Bang || token.kind === TokenKind.Minus;
}

function parseExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  return parsePrefixExpression(tokens, cursor);
}

function parsePrefixExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let expression = createExpression(tokens);
  let prefix = tokens[cursor];
  let nextCursor = 0;

  if (isPrefixToken(prefix)) {
    expression.value = parseExpressionValue(tokens[cursor + 1]);
    expression.operator = prefix;
    nextCursor = cursor + 2;
  } else {
    expression.value = parseExpressionValue(prefix);
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
