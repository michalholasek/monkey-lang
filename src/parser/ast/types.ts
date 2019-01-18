import { Token, TokenKind } from '../../lexer/types';

export interface AssertionError {
  message: string;
}

interface BlockStatement {
  statements: Statement[];
  tokens: Token[];
}

export interface Expression {
  left?: Expression;
  operator?: Token;
  right?: Expression;
  condition?: Expression;
  consequence?: BlockStatement;
  alternative?: BlockStatement;
  tokens: Token[];
  value?: ExpressionValue;
}

export type ExpressionValue = number | string | boolean | FunctionLiteral;

export interface FunctionLiteral {
  body: BlockStatement;
  parameters: Token[];
  tokens: Token[];
}

export interface Identifier {
  kind: TokenKind;
  literal: string;
}

export interface Program {
  errors: AssertionError[];
  statements: Statement[];
}

export interface Statement {
  kind?: StatementKind;
  name?: Identifier;
  tokens?: Token[];
  expression?: Expression;
}

// Let and Return ordering matches TokenKind
export enum StatementKind {
  Let = 17,
  Return = 22,
  Expression = 100
}

export interface TokenCoordinates {
  column: number;
  line: number;
}
