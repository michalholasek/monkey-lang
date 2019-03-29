import { Token, TokenKind } from '../../lexer/types';
import { ExpressionValue } from '../ast/types';
import { ExpressionParseResult } from '../types';

import { createExpression, determineExpressionKind, determineOperatorPrecedence } from './helpers';

export function parseValueExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let currentToken = tokens[cursor];
  let nextToken = tokens[cursor + 1];
  let nextPrecedence = determineOperatorPrecedence(nextToken);
  let expression = createExpression([currentToken]);
  expression.value = parseExpressionValue(currentToken);
  expression.kind = determineExpressionKind(currentToken);

  return {
    expression,
    cursor: cursor + 1,
    nextPrecedence
  };
}

function parseExpressionValue(token: Token): ExpressionValue {
  switch (token.kind) {
    case TokenKind.Int:
      return parseInt(token.literal, 10);
    case TokenKind.True:
    case TokenKind.False:
      return token.kind === TokenKind.True ? true : false;
    default:
      return token.literal;
  }
}
