import { TokenKind } from '../../../lexer/types';
import { NodeKind } from '../../ast/types';

export const Statements = {
  Empty: { statements: [] },
  Error: {
    'let let = 0;': {
      errors: [{ message: 'invalid token(6, 1): expected Identifier, got Let instead' }],
      statements: []
    },
    'return ,;': {
      errors: [{ message: 'unexpected token(9, 1): got Comma' }],
      statements: []
    }
  },
  Let: {
    statements: [
      {
        expression: {
          tokens: [{ column: 16, kind: TokenKind.Int, line: 2, literal: '5' }],
          value: 5
        },
        kind: NodeKind.Let,
        name: { column: 12, kind: 2, line: 2, literal: 'x' },
        tokens: [
          { column: 8, kind: TokenKind.Let, line: 2, literal: 'let' },
          { column: 12, kind: TokenKind.Identifier, line: 2, literal: 'x' },
          { column: 14, kind: TokenKind.Assign, line: 2, literal: '=' },
          { column: 16, kind: TokenKind.Int, line: 2, literal: '5' }
        ]
      },
      {
        expression: {
          tokens: [{ column: 16, kind: TokenKind.Int, line: 3, literal: '10' }],
          value: 10
        },
        kind: NodeKind.Let,
        name: { column: 12, kind: TokenKind.Identifier, line: 3, literal: 'y' },
        tokens: [
          { column: 8, kind: TokenKind.Let, line: 3, literal: 'let' },
          { column: 12, kind: TokenKind.Identifier, line: 3, literal: 'y' },
          { column: 14, kind: TokenKind.Assign, line: 3, literal: '=' },
          { column: 16, kind: TokenKind.Int, line: 3, literal: '10' }
        ]
      },
      {
        expression: {
          tokens: [{ column: 21, kind: TokenKind.Int, line: 4, literal: '838383' }],
          value: 838383
        },
        kind: NodeKind.Let,
        name: { column: 12, kind: 2, line: 4, literal: 'foobar' },
        tokens: [
          { column: 8, kind: TokenKind.Let, line: 4, literal: 'let' },
          { column: 12, kind: TokenKind.Identifier, line: 4, literal: 'foobar' },
          { column: 19, kind: TokenKind.Assign, line: 4, literal: '=' },
          { column: 21, kind: TokenKind.Int, line: 4, literal: '838383' }
        ]
      }
    ]
  },
  Return: {
    statements: [
      {
        expression: {
          tokens: [{ column: 15, kind: TokenKind.Int, line: 2, literal: '5' }],
          value: 5
        },
        kind: NodeKind.Return,
        tokens: [
          { column: 8, kind: TokenKind.Return, line: 2, literal: 'return' },
          { column: 15, kind: TokenKind.Int, line: 2, literal: '5' }
        ]
      },
      {
        expression: {
          tokens: [{ column: 15, kind: TokenKind.Int, line: 3, literal: '10' }],
          value: 10
        },
        kind: NodeKind.Return,
        tokens: [
          { column: 8, kind: TokenKind.Return, line: 3, literal: 'return' },
          { column: 15, kind: TokenKind.Int, line: 3, literal: '10' }
        ]
      },
      {
        expression: {
          tokens: [{ column: 15, kind: TokenKind.Int, line: 4, literal: '993322' }],
          value: 993322
        },
        kind: NodeKind.Return,
        tokens: [
          { column: 8, kind: TokenKind.Return, line: 4, literal: 'return' },
          { column: 15, kind: TokenKind.Int, line: 4, literal: '993322' }
        ]
      }
    ]
  }
};
