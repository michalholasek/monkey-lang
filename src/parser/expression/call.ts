import { Token, TokenKind } from '../../lexer/types';
import { Expression, ExpressionKind } from '../ast/types';
import { ExpressionParseResult, Precedence } from '../types';

import { Include } from '../constants';
import { createExpression, determineOperatorPrecedence } from './helpers';
import { parseExpressionList } from './list';

export function parseCallExpression(tokens: Token[], cursor: number, left: Expression): ExpressionParseResult {
  let argumentListParseResult = parseExpressionList(tokens, cursor, TokenKind.RightParenthesis);
  let expression = createExpression(ExpressionKind.Call, left.tokens.concat(tokens.slice(cursor - Include.Identifier, argumentListParseResult.cursor)));
  expression.arguments = argumentListParseResult.expressions;

  let identifier = expression.tokens[0];
  if (identifier.kind === TokenKind.Identifier) expression.identifier = identifier;

  // Immediately executed function expression
  if (left.value) expression.value = left.value;

  let nextToken = tokens[argumentListParseResult.cursor];

  return {
    expression,
    cursor: argumentListParseResult.cursor,
    nextPrecedence: nextToken ? determineOperatorPrecedence(nextToken) : Precedence.Lowest
  };
}
