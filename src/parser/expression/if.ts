import { Token, TokenKind } from '../../lexer/types';
import { ExpressionParseResult, Precedence } from '../types';

import { ExpressionKind } from '../ast/types';
import { Include, Skip } from '../constants';
import { parseBlockStatement } from '../statement';
import { createExpression } from './helpers';
import { parseExpression } from './index';

export function parseIfExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let conditionParseResult = parseExpression(tokens, cursor + Skip.If, Precedence.Lowest);
  let consequenceParseResult = parseBlockStatement(tokens, conditionParseResult.cursor + Skip.Brace);
  let alternativeParseResult;

  let possibleElseToken = tokens[consequenceParseResult.cursor + 1];

  if (possibleElseToken && possibleElseToken.kind === TokenKind.Else) {
    alternativeParseResult = parseBlockStatement(tokens, consequenceParseResult.cursor + Skip.Brace + Skip.Else + Skip.Brace);
  }

  let ifExpressionParseResultCursor = alternativeParseResult ? alternativeParseResult.cursor : consequenceParseResult.cursor;

  let expression = createExpression(ExpressionKind.IfElse, tokens.slice(cursor, ifExpressionParseResultCursor + Include.Brace));
  expression.condition = conditionParseResult.expression;
  expression.consequence = {
    statements: consequenceParseResult.statements,
    tokens: consequenceParseResult.tokens
  };

  if (alternativeParseResult) {
    expression.alternative = {
      statements: alternativeParseResult.statements,
      tokens: alternativeParseResult.tokens
    };
  }

  return {
    expression,
    cursor: ifExpressionParseResultCursor,
    nextPrecedence: Precedence.Lowest
  };
}
