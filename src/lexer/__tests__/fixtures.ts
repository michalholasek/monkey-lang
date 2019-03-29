import { TokenKind } from '../types';

export const Tokens = {
  PrefixOperator: [
    { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
    { column: 3, kind: TokenKind.Int, line: 1, literal: '5' },
    { column: 4, kind: TokenKind.Semicolon, line: 1, literal: ';' },
    { column: 5, kind: TokenKind.Bang, line: 1, literal: '!' },
    { column: 6, kind: TokenKind.True, line: 1, literal: 'true' },
    { column: 10, kind: TokenKind.Semicolon, line: 1, literal: ';' },
    { column: 11, kind: TokenKind.Bang, line: 1, literal: '!' },
    { column: 12, kind: TokenKind.Bang, line: 1, literal: '!' },
    { column: 13, kind: TokenKind.True, line: 1, literal: 'true' },
    { column: 17, kind: TokenKind.Semicolon, line: 1, literal: ';' },
    { column: 17, kind: TokenKind.EOF, line: 1, literal: '' }
  ],
  Keywords: [
    { column: 2, kind: TokenKind.True, line: 1, literal: 'true' },
    { column: 7, kind: TokenKind.False, line: 1, literal: 'false' },
    { column: 13, kind: TokenKind.If, line: 1, literal: 'if' },
    { column: 16, kind: TokenKind.Else, line: 1, literal: 'else' },
    { column: 21, kind: TokenKind.Return, line: 1, literal: 'return' },
    { column: 26, kind: TokenKind.EOF, line: 1, literal: '' }
  ],
  NonLetter: [
    { column: 2, kind: TokenKind.Assign, line: 1, literal: '=' },
    { column: 3, kind: TokenKind.Plus, line: 1, literal: '+' },
    { column: 4, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
    { column: 5, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
    { column: 6, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
    { column: 7, kind: TokenKind.RightBrace, line: 1, literal: '}' },
    { column: 8, kind: TokenKind.Comma, line: 1, literal: ',' },
    { column: 9, kind: TokenKind.Semicolon, line: 1, literal: ';' },
    { column: 9, kind: TokenKind.EOF, line: 1, literal: '' }
  ],
  Operators: [
    { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
    { column: 4, kind: TokenKind.Minus, line: 1, literal: '-' },
    { column: 6, kind: TokenKind.Slash, line: 1, literal: '/' },
    { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
    { column: 10, kind: TokenKind.LessThan, line: 1, literal: '<' },
    { column: 12, kind: TokenKind.GreaterThan, line: 1, literal: '>' },
    { column: 12, kind: TokenKind.EOF, line: 1, literal: '' }
  ],
  Statements: [
    { column: 8, kind: TokenKind.Let, line: 2, literal: 'let' },
    { column: 12, kind: TokenKind.Identifier, line: 2, literal: 'five' },
    { column: 17, kind: TokenKind.Assign, line: 2, literal: '=' },
    { column: 19, kind: TokenKind.Int, line: 2, literal: '5' },
    { column: 20, kind: TokenKind.Semicolon, line: 2, literal: ';' },
    { column: 8, kind: TokenKind.Let, line: 3, literal: 'let' },
    { column: 12, kind: TokenKind.Identifier, line: 3, literal: 'ten' },
    { column: 16, kind: TokenKind.Assign, line: 3, literal: '=' },
    { column: 18, kind: TokenKind.Int, line: 3, literal: '10' },
    { column: 20, kind: TokenKind.Semicolon, line: 3, literal: ';' },
    { column: 8, kind: TokenKind.Let, line: 4, literal: 'let' },
    { column: 12, kind: TokenKind.Identifier, line: 4, literal: 'add' },
    { column: 16, kind: TokenKind.Assign, line: 4, literal: '=' },
    { column: 18, kind: TokenKind.Function, line: 4, literal: 'fn' },
    { column: 20, kind: TokenKind.LeftParenthesis, line: 4, literal: '(' },
    { column: 21, kind: TokenKind.Identifier, line: 4, literal: 'x' },
    { column: 22, kind: TokenKind.Comma, line: 4, literal: ',' },
    { column: 24, kind: TokenKind.Identifier, line: 4, literal: 'y' },
    { column: 25, kind: TokenKind.RightParenthesis, line: 4, literal: ')' },
    { column: 27, kind: TokenKind.LeftBrace, line: 4, literal: '{' },
    { column: 10, kind: TokenKind.Identifier, line: 5, literal: 'x' },
    { column: 12, kind: TokenKind.Plus, line: 5, literal: '+' },
    { column: 14, kind: TokenKind.Identifier, line: 5, literal: 'y' },
    { column: 15, kind: TokenKind.Semicolon, line: 5, literal: ';' },
    { column: 8, kind: TokenKind.RightBrace, line: 6, literal: '}' },
    { column: 9, kind: TokenKind.Semicolon, line: 6, literal: ';' },
    { column: 8, kind: TokenKind.Let, line: 7, literal: 'let' },
    { column: 12, kind: TokenKind.Identifier, line: 7, literal: '_result' },
    { column: 20, kind: TokenKind.Assign, line: 7, literal: '=' },
    { column: 22, kind: TokenKind.Identifier, line: 7, literal: 'add' },
    { column: 25, kind: TokenKind.LeftParenthesis, line: 7, literal: '(' },
    { column: 26, kind: TokenKind.Identifier, line: 7, literal: 'five' },
    { column: 30, kind: TokenKind.Comma, line: 7, literal: ',' },
    { column: 32, kind: TokenKind.Identifier, line: 7, literal: 'ten' },
    { column: 35, kind: TokenKind.RightParenthesis, line: 7, literal: ')' },
    { column: 36, kind: TokenKind.Semicolon, line: 7, literal: ';' },
    { column: 5, kind: TokenKind.EOF, line: 8, literal: '' }
  ],
  StickyOperators: [
    { column: 8, kind: TokenKind.Int, line: 2, literal: '10' },
    { column: 11, kind: TokenKind.Equal, line: 2, literal: '==' },
    { column: 14, kind: TokenKind.Int, line: 2, literal: '10' },
    { column: 16, kind: TokenKind.Semicolon, line: 2, literal: ';' },
    { column: 8, kind: TokenKind.Int, line: 3, literal: '10' },
    { column: 11, kind: TokenKind.NotEqual, line: 3, literal: '!=' },
    { column: 14, kind: TokenKind.Int, line: 3, literal: '9' },
    { column: 15, kind: TokenKind.Semicolon, line: 3, literal: ';' },
    { column: 5, kind: TokenKind.EOF, line: 4, literal: '' }
  ],
  String: [
    { column: 2, kind: TokenKind.String, line: 1, literal: 'foo bar' },
    { column: 10, kind: TokenKind.EOF, line: 1, literal: '' }
  ],
  Array: [
    { column: 2, kind: TokenKind.LeftBracket, line: 1, literal: '[' },
    { column: 3, kind: TokenKind.Int, line: 1, literal: '1' },
    { column: 4, kind: TokenKind.Comma, line: 1, literal: ',' },
    { column: 6, kind: TokenKind.Int, line: 1, literal: '2' },
    { column: 7, kind: TokenKind.RightBracket, line: 1, literal: ']' },
    { column: 8, kind: TokenKind.Semicolon, line: 1, literal: ';' },
    { column: 8, kind: TokenKind.EOF, line: 1, literal: '' }
  ],
  Hash: [
    { column: 2, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
    { column: 4, kind: TokenKind.String, line: 1, literal: 'foo' },
    { column: 9, kind: TokenKind.Colon, line: 1, literal: ':' },
    { column: 11, kind: TokenKind.String, line: 1, literal: 'bar' },
    { column: 17, kind: TokenKind.RightBrace, line: 1, literal: '}' }
  ]
};
