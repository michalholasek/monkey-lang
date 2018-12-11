import { Token, TokenKind } from '../lexer/types';

export enum StatementKind {
  Let
}

export interface Expression {
  tokens: Token[];
  value: string;
}

export interface Identifier {
  kind: TokenKind;
  literal: string;
}

export interface Statement {
  kind: StatementKind;
  name: Identifier;
  tokens: Token[];
  expression: Expression;
}

export interface Program {
  statements: Statement[];
}
