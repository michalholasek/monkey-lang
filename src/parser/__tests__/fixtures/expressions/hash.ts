import { TokenKind } from '../../../../lexer/types';
import { NodeKind } from '../../../ast/types';

export const Hash = {
  '{}': {
    statements: [
      {
        expression: {
          pairs: [],
          tokens: [
            { column: 2, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
            { column: 3, kind: TokenKind.RightBrace, line: 1, literal: '}' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
          { column: 3, kind: TokenKind.RightBrace, line: 1, literal: '}' }
        ]
      }
    ]
  },
  '{ "one": 1, "two": 2, "three": 3 }': {
    statements: [
      {
        expression: {
          pairs: [
            {
              key: {
                value: 'one',
                tokens: [{ column: 4, kind: TokenKind.String, line: 1, literal: 'one' }]
              },
              value: {
                value: 1,
                tokens: [{ column: 11, kind: TokenKind.Int, line: 1, literal: '1' }]
              }
            },
            {
              key: {
                value: 'two',
                tokens: [{ column: 14, kind: TokenKind.String, line: 1, literal: 'two' }]
              },
              value: {
                value: 2,
                tokens: [{ column: 21, kind: TokenKind.Int, line: 1, literal: '2' }]
              }
            },
            {
              key: {
                value: 'three',
                tokens: [{ column: 24, kind: TokenKind.String, line: 1, literal: 'three' }]
              },
              value: {
                value: 3,
                tokens: [{ column: 33, kind: TokenKind.Int, line: 1, literal: '3' }]
              }
            }
          ],
          tokens: [
            { column: 2, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
            { column: 4, kind: TokenKind.String, line: 1, literal: 'one' },
            { column: 9, kind: TokenKind.Colon, line: 1, literal: ':' },
            { column: 11, kind: TokenKind.Int, line: 1, literal: '1' },
            { column: 12, kind: TokenKind.Comma, line: 1, literal: ',' },
            { column: 14, kind: TokenKind.String, line: 1, literal: 'two' },
            { column: 19, kind: TokenKind.Colon, line: 1, literal: ':' },
            { column: 21, kind: TokenKind.Int, line: 1, literal: '2' },
            { column: 22, kind: TokenKind.Comma, line: 1, literal: ',' },
            { column: 24, kind: TokenKind.String, line: 1, literal: 'three' },
            { column: 31, kind: TokenKind.Colon, line: 1, literal: ':' },
            { column: 33, kind: TokenKind.Int, line: 1, literal: '3' },
            { column: 35, kind: TokenKind.RightBrace, line: 1, literal: '}' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
          { column: 4, kind: TokenKind.String, line: 1, literal: 'one' },
          { column: 9, kind: TokenKind.Colon, line: 1, literal: ':' },
          { column: 11, kind: TokenKind.Int, line: 1, literal: '1' },
          { column: 12, kind: TokenKind.Comma, line: 1, literal: ',' },
          { column: 14, kind: TokenKind.String, line: 1, literal: 'two' },
          { column: 19, kind: TokenKind.Colon, line: 1, literal: ':' },
          { column: 21, kind: TokenKind.Int, line: 1, literal: '2' },
          { column: 22, kind: TokenKind.Comma, line: 1, literal: ',' },
          { column: 24, kind: TokenKind.String, line: 1, literal: 'three' },
          { column: 31, kind: TokenKind.Colon, line: 1, literal: ':' },
          { column: 33, kind: TokenKind.Int, line: 1, literal: '3' },
          { column: 35, kind: TokenKind.RightBrace, line: 1, literal: '}' }
        ]
      }
    ]
  }
};
