import { AssertionError, Statement } from './ast/types';

export enum AssertionErrorKind {
  InvalidToken = 'invalid token'
}

export interface StatementAssertionResult {
  errors: AssertionError[];
}

export interface StatementParseResult {
  errors: AssertionError[];
  node: Statement;
  tokenRangeStart: number;
  tokenRangeEnd: number;
}
