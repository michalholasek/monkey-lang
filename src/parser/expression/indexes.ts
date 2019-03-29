import { Token } from '../../lexer/types';
import { Expression } from '../ast/types';
import { ExpressionParseResult, Precedence } from '../types';

import { Include, Skip } from '../constants';
import { createExpression, determineOperatorPrecedence } from './helpers';
import { parseExpression } from './index';

export function parseIndexExpression(tokens: Token[], cursor: number, left: Expression): ExpressionParseResult {
  let indexExpressionParseResult = parseExpression(tokens, cursor, Precedence.Lowest);
  let lastExpressionTokenIndex = cursor - Include.Bracket + indexExpressionParseResult.expression.tokens.length + Include.Bracket + 1;
  let expression = createExpression(left.tokens.concat(tokens.slice(cursor - Include.Bracket, lastExpressionTokenIndex)));

  expression.left = left;
  expression.index = indexExpressionParseResult.expression;

  let nextToken = tokens[indexExpressionParseResult.cursor + Skip.Bracket];

  return {
    expression,
    cursor: indexExpressionParseResult.cursor + Skip.Bracket,
    nextPrecedence: nextToken ? determineOperatorPrecedence(nextToken) : Precedence.Lowest
  };
}
