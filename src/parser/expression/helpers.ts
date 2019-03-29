import { AssertionError } from '../../common/types';
import { Token, TokenKind } from '../../lexer/types';
import { Expression, ExpressionKind } from '../ast/types';
import { AssertionResult, ParsingFunction, Precedence } from '../types';

import { parseArrayExpression } from './array';
import { parseFunctionExpression } from './function';
import { parseGroupedExpression } from './grouped';
import { parseHashExpression } from './hash';
import { parseIfExpression } from './if';
import { parseValueExpression } from './value';

export function createAssertionResult(errors: AssertionError[] = []): AssertionResult {
  return {
    errors
  };
}

export function createExpression(tokens: Token[]): Expression {
  return { tokens };
}

export function determineExpressionKind(token: Token): ExpressionKind {
  switch (token.kind) {
    case TokenKind.Int:
      return ExpressionKind.Integer;
    case TokenKind.Identifier:
      return ExpressionKind.Identifier;
    case TokenKind.True:
    case TokenKind.False:
      return ExpressionKind.Boolean;
    case TokenKind.String:
      return ExpressionKind.String;
    default:
      return ExpressionKind.Illegal;
  }
}

export function determineOperatorPrecedence(operator: Token): Precedence {
  let precedence;

  if (operator) {
    precedence = OperatorPrecedences[operator.kind];
  }

  return precedence || Precedence.Lowest;
}

export const OperatorPrecedences: { [index: number]: Precedence } = {
  12: Precedence.Equals,      // TokenKind.Equal
  13: Precedence.Equals,      // TokenKind.NotEqual
  10: Precedence.LessGreater, // TokenKind.LessThan
  11: Precedence.LessGreater, // TokenKind.GreaterThan
   5: Precedence.Sum,         // TokenKind.Plus
   6: Precedence.Sum,         // TokenKind.Minus
   8: Precedence.Product,     // TokenKind.Asterisk
   9: Precedence.Product,     // TokenKind.Slash
  23: Precedence.Call,        // TokenKind.LeftParenthesis
  28: Precedence.Index        // TokenKind.LeftBracket
};

export const ParsingFunctions: { [index: number]: ParsingFunction } = {
   2: parseValueExpression,    // TokenKind.Identifier
   3: parseValueExpression,    // TokenKind.Int
  16: parseFunctionExpression, // TokenKind.Function
  18: parseValueExpression,    // TokenKind.True
  19: parseValueExpression,    // TokenKind.False
  20: parseIfExpression,       // TokenKind.If
  23: parseGroupedExpression,  // TokenKind.LeftParenthesis
  25: parseHashExpression,     // TokenKind.LeftBrace
  27: parseValueExpression,    // TokenKind.String
  28: parseArrayExpression     // TokenKind.LeftBracket
};
