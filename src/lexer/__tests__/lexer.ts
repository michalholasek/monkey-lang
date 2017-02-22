import lexer from '../lexer';

import { Token, TokenKind } from '../../types/token';

describe('Lexer', () => {

  it('should tokenize given input correctly (1)', () => {
    const actual : Token[] = lexer('=+(){},;');

    const expected : Token[] = [
      { kind: TokenKind.Assign, literal: '=' },
      { kind: TokenKind.Plus, literal: '+' },
      { kind: TokenKind.LeftParenthesis, literal: '(' },
      { kind: TokenKind.RightParenthesis, literal: ')' },
      { kind: TokenKind.LeftBrace, literal: '{' },
      { kind: TokenKind.RightBrace, literal: '}' },
      { kind: TokenKind.Comma, literal: ',' },
      { kind: TokenKind.Semicolon, literal: ';' },
      { kind: TokenKind.EOF, literal: '' }
    ];

    expected.forEach((item, index) => {
      expect(actual[index]).toEqual(item);
    });
  });

});
