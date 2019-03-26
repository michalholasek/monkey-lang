import { AssertionError } from '../common/types';
import { Token } from '../lexer/types';
import { Expression, Statement } from './ast/types';

export interface AssertionResult {
  errors: AssertionError[];
}

export interface BlockStatementParseResult {
  cursor: number;
  statements: Statement[];
  tokens: Token[];
}

export interface FunctionParametersParseResult {
  cursor: number;
  parameters: Token[];
  tokens: Token[];
}

export interface StatementParseResult {
  errors: AssertionError[];
  statement: Statement;
  tokenRangeStart: number;
  tokenRangeEnd: number;
}

export interface ExpressionParseResult {
  expression: Expression;
  cursor: number;
  nextPrecedence: Precedence;
}

export interface ExpressionListParseResult {
  cursor: number;
  expressions: Expression[];
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
