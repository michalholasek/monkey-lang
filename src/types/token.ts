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
