import { Token, TokenKind } from '../lexer/types';

export interface AssertionError {
  message: string;
}

export interface Expression {
  tokens: Token[];
  value: string;
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

export enum StatementKind {
  Let
}
