import lexer from '../index';

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

  it('should tokenize given input correctly (2)', () => {
    const actual : Token[] = lexer(`
      let five = 5;
      let ten = 10;
      let add = fn(x, y) {
        x + y;
      };
      let _result = add(five, ten);
    `);

    const expected : Token[] = [
      { kind: TokenKind.Let, literal: 'let' },
      { kind: TokenKind.Identifier, literal: 'five' },
      { kind: TokenKind.Assign, literal: '=' },
      { kind: TokenKind.Int, literal: '5' },
      { kind: TokenKind.Semicolon, literal: ';' },
      { kind: TokenKind.Let, literal: 'let' },
      { kind: TokenKind.Identifier, literal: 'ten' },
      { kind: TokenKind.Assign, literal: '=' },
      { kind: TokenKind.Int, literal: '10' },
      { kind: TokenKind.Semicolon, literal: ';' },
      { kind: TokenKind.Let, literal: 'let' },
      { kind: TokenKind.Identifier, literal: 'add' },
      { kind: TokenKind.Assign, literal: '=' },
      { kind: TokenKind.Function, literal: 'fn' },
      { kind: TokenKind.LeftParenthesis, literal: '(' },
      { kind: TokenKind.Identifier, literal: 'x' },
      { kind: TokenKind.Comma, literal: ',' },
      { kind: TokenKind.Identifier, literal: 'y' },
      { kind: TokenKind.RightParenthesis, literal: ')' },
      { kind: TokenKind.LeftBrace, literal: '{' },
      { kind: TokenKind.Identifier, literal: 'x' },
      { kind: TokenKind.Plus, literal: '+' },
      { kind: TokenKind.Identifier, literal: 'y' },
      { kind: TokenKind.Semicolon, literal: ';' },
      { kind: TokenKind.RightBrace, literal: '}' },
      { kind: TokenKind.Semicolon, literal: ';' },
      { kind: TokenKind.Let, literal: 'let' },
      { kind: TokenKind.Identifier, literal: '_result' },
      { kind: TokenKind.Assign, literal: '=' },
      { kind: TokenKind.Identifier, literal: 'add' },
      { kind: TokenKind.LeftParenthesis, literal: '(' },
      { kind: TokenKind.Identifier, literal: 'five' },
      { kind: TokenKind.Comma, literal: ',' },
      { kind: TokenKind.Identifier, literal: 'ten' },
      { kind: TokenKind.RightParenthesis, literal: ')' },
      { kind: TokenKind.Semicolon, literal: ';' },
      { kind: TokenKind.EOF, literal: '' }
    ];

    expected.forEach((item, index) => {
      expect(actual[index]).toEqual(item);
    });
  });

  it('should tokenize given input correctly (3)', () => {
    const actual : Token[] = lexer('! - / * < >');

    const expected : Token[] = [
      { kind: TokenKind.Bang, literal: '!' },
      { kind: TokenKind.Minus, literal: '-' },
      { kind: TokenKind.Slash, literal: '/' },
      { kind: TokenKind.Asterisk, literal: '*' },
      { kind: TokenKind.LessThan, literal: '<' },
      { kind: TokenKind.GreatThan, literal: '>' },
      { kind: TokenKind.EOF, literal: '' }
    ];

    expected.forEach((item, index) => {
      expect(actual[index]).toEqual(item);
    });
  });

  it('should tokenize given input correctly (4)', () => {
    const actual : Token[] = lexer('true false if else return');

    const expected : Token[] = [
      { kind: TokenKind.True, literal: 'true' },
      { kind: TokenKind.False, literal: 'false' },
      { kind: TokenKind.If, literal: 'if' },
      { kind: TokenKind.Else, literal: 'else' },
      { kind: TokenKind.Return, literal: 'return' },
      { kind: TokenKind.EOF, literal: '' }
    ];

    expected.forEach((item, index) => {
      expect(actual[index]).toEqual(item);
    });
  });

  it('should tokenize given input correctly (5)', () => {
    const actual : Token[] = lexer(`
      10 == 10;
      10 != 9;
    `);

    const expected : Token[] = [
      { kind: TokenKind.Int, literal: '10' },
      { kind: TokenKind.Equal, literal: '==' },
      { kind: TokenKind.Int, literal: '10' },
      { kind: TokenKind.Semicolon, literal: ';' },
      { kind: TokenKind.Int, literal: '10' },
      { kind: TokenKind.NotEqual, literal: '!=' },
      { kind: TokenKind.Int, literal: '9' },
      { kind: TokenKind.Semicolon, literal: ';' },
      { kind: TokenKind.EOF, literal: '' }
    ];

    expected.forEach((item, index) => {
      expect(actual[index]).toEqual(item);
    });
  });

});
