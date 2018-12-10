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
  GreatThan,
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
  RightBrace
}

export interface Token {
  literal : string;
  kind : TokenKind;
}

export const KEYWORDS : { [index : string] : TokenKind } = {
  else: TokenKind.Else,
  false: TokenKind.False,
  fn: TokenKind.Function,
  if: TokenKind.If,
  let: TokenKind.Let,
  return: TokenKind.Return,
  true: TokenKind.True
};
