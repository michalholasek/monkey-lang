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
}

export enum Precedence {
  Lowest = 1,
  Equals,
  LessGreater,
  Sum,
  Product,
  Prefix,
  Call
}
