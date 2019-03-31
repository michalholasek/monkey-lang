import { Token, TokenKind } from '../../lexer/types';
import { ExpressionParseResult, Precedence } from '../types';

import { ExpressionKind } from '../ast/types';
import { Include, Skip } from '../constants';
import { createExpression, determineOperatorPrecedence } from './helpers';
import { parseExpression } from './index';

export function parseHashExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let currentToken = tokens[cursor + Skip.Brace];
  let nextToken = tokens[cursor + Skip.Brace + 1];
  let expression = createExpression(ExpressionKind.Hash, []);
  let pairs = [];
  let index = cursor + 1;
  let skip = false;

  if (currentToken && currentToken.kind === TokenKind.RightBrace) {
    expression.pairs = [];
    expression.tokens = tokens.slice(cursor, cursor + Include.Bracket + 1);

    return {
      cursor: cursor + Skip.Bracket + Skip.Bracket,
      expression,
      nextPrecedence: nextToken ? determineOperatorPrecedence(nextToken) : Precedence.Lowest
    };
  }

  while (index < tokens.length && currentToken.kind !== TokenKind.RightBrace) {
    if (skip) {
      index++;
      continue;
    }

    let keyExpressionParseResult = parseExpression(tokens, index, Precedence.Lowest);
    index = keyExpressionParseResult.cursor;
    nextToken = tokens[index];

    if (nextToken && nextToken.kind !== TokenKind.Colon) {
      skip = true;
      index++;
      continue;
    }

    index++;
    let valueExpressionParseResult = parseExpression(tokens, index, Precedence.Lowest);
    index = valueExpressionParseResult.cursor;
    nextToken = tokens[index];

    if (nextToken && nextToken.kind === TokenKind.Comma) {
      index = index + Skip.Comma;
    }

    currentToken = tokens[index];

    pairs.push({ key: keyExpressionParseResult.expression, value: valueExpressionParseResult.expression });
  }

  expression.pairs = pairs;
  expression.tokens = tokens.slice(cursor, index + Include.Brace);

  nextToken = tokens[index + Skip.Brace];

  return {
    cursor: index + Skip.Brace,
    expression,
    nextPrecedence: nextToken ? determineOperatorPrecedence(nextToken) : Precedence.Lowest
  };
}
