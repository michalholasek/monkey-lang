import { Token } from '../lexer/types';
import { AssertionError, Expression, Statement } from './ast/types';

export enum AssertionErrorKind {
  InvalidToken = 'invalid token'
}

export interface AssertionResult {
  errors: AssertionError[];
}

export interface StatementParseResult {
  errors: AssertionError[];
  node: Statement;
  tokenRangeStart: number;
  tokenRangeEnd: number;
}

export interface ExpressionParseResult {
  expression: Expression;
  cursor: number;
  nextPrecedence: Precedence;
}

export type ParsingFunction = (tokens: Token[], cursor: number) => ExpressionParseResult;

export enum Precedence {
  Lowest = 1,
  Equals,
  LessGreater,
  Sum,
  Product,
  Prefix,
  Call
}

export const OperatorPrecedences: { [index: number]: Precedence } = {
  12: Precedence.Equals,      // TokenKind.Equal
  13: Precedence.Equals,      // TokenKind.NotEqual
  10: Precedence.LessGreater, // TokenKind.LessThan
  11: Precedence.LessGreater, // TokenKind.GreatThan
   5: Precedence.Sum,         // TokenKind.Plus
   6: Precedence.Sum,         // TokenKind.Minus
   8: Precedence.Product,     // TokenKind.Asterisk
   9: Precedence.Product      // TokenKind.Slash
};
