import { Token, TokenKind } from '../../lexer/types';
import { ExpressionParseResult, Precedence } from '../types';

import { ExpressionKind } from '../ast/types';
import { Include, Skip } from '../constants';
import { createExpression, determineOperatorPrecedence } from './helpers';
import { parseExpressionList } from './list';

export function parseArrayExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let currentToken = tokens[cursor + Skip.Bracket];
  let nextToken = tokens[cursor + Skip.Bracket + 1];
  let expression = createExpression(ExpressionKind.Array, []);

  if (currentToken && currentToken.kind === TokenKind.RightBracket) {
    expression.tokens = tokens.slice(cursor, cursor + Include.Bracket + Include.Bracket);
    expression.value = {
      elements: [],
      tokens: expression.tokens
    };

    return {
      cursor: cursor + Skip.Bracket + Skip.Bracket,
      expression,
      nextPrecedence: nextToken ? determineOperatorPrecedence(nextToken) : Precedence.Lowest
    };
  }

  let expressionListParseResult = parseExpressionList(tokens, cursor + Skip.Bracket, TokenKind.RightBracket);

  expression.tokens = tokens.slice(cursor, expressionListParseResult.cursor);
  expression.value = {
    elements: expressionListParseResult.expressions,
    tokens: expression.tokens
  };

  nextToken = tokens[expressionListParseResult.cursor];

  return {
    cursor: expressionListParseResult.cursor,
    expression,
    nextPrecedence: nextToken ? determineOperatorPrecedence(nextToken) : Precedence.Lowest
  };
}
