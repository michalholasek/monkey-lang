import { Token } from '../../lexer/types';
import { ExpressionParseResult, Precedence } from '../types';

import { parseInfixExpression } from './infix';
import { parsePrefixExpression } from './prefix';

export function parseExpression(tokens: Token[], cursor: number, precedence: Precedence): ExpressionParseResult {
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

export function parseStatementExpression(tokens: Token[]): ExpressionParseResult {
  let cursor = 0;
  return parseExpression(tokens, cursor, Precedence.Lowest);
}
