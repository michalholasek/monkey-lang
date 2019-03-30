import { Token, TokenKind } from '../../lexer/types';
import { Expression, ExpressionKind } from '../ast/types';
import { ExpressionParseResult } from '../types';

import { Skip } from '../constants';
import { parseCallExpression } from './call';
import { createExpression, determineOperatorPrecedence } from './helpers';
import { parseExpression } from './index';
import { parseIndexExpression } from './indexes';

export function parseInfixExpression(tokens: Token[], cursor: number, left: Expression): ExpressionParseResult {
  let operator = tokens[cursor];
  let currentPrecedence = determineOperatorPrecedence(operator);
  let rightExpressionParseResult;
  let expression;

  switch (operator.kind) {
    case TokenKind.LeftParenthesis:
      return parseCallExpression(tokens, cursor + Skip.Parenthesis, left);
    case TokenKind.LeftBracket:
      return parseIndexExpression(tokens, cursor + Skip.Bracket, left);
    default:
      rightExpressionParseResult = parseExpression(tokens, cursor + Skip.Operator, currentPrecedence);
      expression = createExpression(ExpressionKind.Infix, left.tokens.concat([operator]).concat(rightExpressionParseResult.expression.tokens));
      expression.left = left;
      expression.operator = operator;
      expression.right = rightExpressionParseResult.expression;

      return {
        expression,
        cursor: rightExpressionParseResult.cursor,
        nextPrecedence: rightExpressionParseResult.nextPrecedence
      };
  }
}
