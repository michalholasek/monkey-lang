import { Token, TokenKind } from '../../lexer/types';
import { ExpressionParseResult, Precedence } from '../types';

import { Skip } from '../constants';
import { determineOperatorPrecedence } from './helpers';
import { parseExpression } from './index';

export function parseGroupedExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let expressionParseResult = parseExpression(tokens, cursor + Skip.Parenthesis, Precedence.Lowest);
  let nextToken = tokens[expressionParseResult.cursor];
  let index = 0;

  while (nextToken && nextToken.kind === TokenKind.RightParenthesis) {
    index++;
    nextToken = tokens[expressionParseResult.cursor + index];
  }

  expressionParseResult.cursor = expressionParseResult.cursor + index;
  expressionParseResult.nextPrecedence = determineOperatorPrecedence(nextToken);

  return expressionParseResult;
}
