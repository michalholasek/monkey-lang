export enum TokenKind {
  Illegal,
  EOF,

  // Identifiers and literals
  Identifier,
  Int,

  // Operators
  Assign,
  Plus,

  // Delimiters
  Comma,
  Semicolon,

  // Keywords
  Function,
  Let,

  LeftParenthesis,
  RightParenthesis,
  LeftBrace,
  RightBrace
}

export interface Token {
  literal : string;
  kind : TokenKind;
}
