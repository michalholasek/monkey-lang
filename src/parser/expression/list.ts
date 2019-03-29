import { Token, TokenKind } from '../../lexer/types';
import { ExpressionListParseResult, Precedence } from '../types';

import { determineOperatorPrecedence } from './helpers';
import { parseExpression } from './index';

export function parseExpressionList(tokens: Token[], cursor: number, end: TokenKind): ExpressionListParseResult {
  let currentToken = tokens[cursor];
  let index = cursor;
  let expressions = [];
  let expressionParseResult;
  let nextToken;

  while (index < tokens.length && currentToken.kind !== end) {
    if (currentToken.kind !== TokenKind.Comma) {
      expressionParseResult = parseExpression(tokens, index, Precedence.Lowest);
      expressions.push(expressionParseResult.expression);
      index = expressionParseResult.cursor;
    } else {
      index++;
    }
    currentToken = tokens[index];
  }

  nextToken = tokens[index + 1];

  return {
    cursor: index + 1,
    expressions,
    nextPrecedence: nextToken ? determineOperatorPrecedence(nextToken) : Precedence.Lowest
  };
}
