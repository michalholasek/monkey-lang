export interface TokenizationOptions {
  characters: string[];
  column: number;
  index: number;
  line: number;
}

export interface TokenizationResult {
  column: number;
  index: number;
  token: Token;
}

export enum TokenKind {
  Illegal,
  EOF,

  // Identifiers and literals
  Identifier,
  Int,

  // Operators
  Assign,
  Plus,
  Minus,
  Bang,
  Asterisk,
  Slash,
  LessThan,
  GreaterThan,
  Equal,
  NotEqual,

  // Delimiters
  Comma,
  Semicolon,

  // Keywords
  Function,
  Let,
  True,
  False,
  If,
  Else,
  Return,

  LeftParenthesis,
  RightParenthesis,
  LeftBrace,
  RightBrace,

  String,

  LeftBracket,
  RightBracket,

  Colon
}

export interface Token {
  column: number;
  line: number;
  literal: string;
  kind: TokenKind;
}

export const Keywords: { [index: string]: TokenKind } = {
  else: TokenKind.Else,
  false: TokenKind.False,
  fn: TokenKind.Function,
  if: TokenKind.If,
  let: TokenKind.Let,
  return: TokenKind.Return,
  true: TokenKind.True
};
