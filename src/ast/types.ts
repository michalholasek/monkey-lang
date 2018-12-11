import { Token } from '../lexer/types';

export enum StatementKind {
  Let
}

export interface Expression {
  tokens: Token[],
  value: string
}

export interface Identifier extends Token { }

export interface Statement {
  kind: StatementKind,
  name: Identifier,
  tokens: Token[],
  expression: Expression
}

export interface Program {
  statements: Statement[]
}
