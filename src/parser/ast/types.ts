import { Token, TokenKind } from '../../lexer/types';

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

// Number ordering matches TokenKind
export enum StatementKind {
  Let = 17,
  Return = 22
}

export interface TokenCoordinates {
  column: number;
  line: number;
}

export const ValidStatementKind: { [index: number]: StatementKind } = {
  17: StatementKind.Let,
  22: StatementKind.Return
};
