import { TokenKind } from '../../../../lexer/types';
import { NodeKind } from '../../../ast/types';

export const Array = {
  '[]': {
    statements: [
      {
        expression: {
          tokens: []
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.LeftBracket, line: 1, literal: '[' },
          { column: 3, kind: TokenKind.RightBracket, line: 1, literal: ']' }
        ]
      }
    ]
  },
  '[1, 2 * 2, 3 + 3]': {
    statements: [
      {
        expression: {
          tokens: [
            { column: 2, kind: TokenKind.LeftBracket, line: 1, literal: '[' },
            { column: 3, kind: TokenKind.Int, line: 1, literal: '1' },
            { column: 4, kind: TokenKind.Comma, line: 1, literal: ',' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '2' },
            { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            { column: 10, kind: TokenKind.Int, line: 1, literal: '2' },
            { column: 11, kind: TokenKind.Comma, line: 1, literal: ',' },
            { column: 13, kind: TokenKind.Int, line: 1, literal: '3' },
            { column: 15, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 17, kind: TokenKind.Int, line: 1, literal: '3' },
            { column: 18, kind: TokenKind.RightBracket, line: 1, literal: ']' }
          ],
          value: {
            elements: [
              {
                tokens: [{ column: 3, kind: TokenKind.Int, line: 1, literal: '1' }],
                value: 1
              },
              {
                left: {
                  tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '2' }],
                  value: 2
                },
                operator: { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
                right: {
                  tokens: [{ column: 10, kind: TokenKind.Int, line: 1, literal: '2' }],
                  value: 2
                },
                tokens: [
                  { column: 6, kind: TokenKind.Int, line: 1, literal: '2' },
                  { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
                  { column: 10, kind: TokenKind.Int, line: 1, literal: '2' }
                ]
              },
              {
                left: {
                  tokens: [{ column: 13, kind: TokenKind.Int, line: 1, literal: '3' }],
                  value: 3
                },
                operator: { column: 15, kind: TokenKind.Plus, line: 1, literal: '+' },
                right: {
                  tokens: [{ column: 17, kind: TokenKind.Int, line: 1, literal: '3' }],
                  value: 3
                },
                tokens: [
                  { column: 13, kind: TokenKind.Int, line: 1, literal: '3' },
                  { column: 15, kind: TokenKind.Plus, line: 1, literal: '+' },
                  { column: 17, kind: TokenKind.Int, line: 1, literal: '3' }
                ]
              }
            ]
          }
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.LeftBracket, line: 1, literal: '[' },
          { column: 3, kind: TokenKind.Int, line: 1, literal: '1' },
          { column: 4, kind: TokenKind.Comma, line: 1, literal: ',' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '2' },
          { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          { column: 10, kind: TokenKind.Int, line: 1, literal: '2' },
          { column: 11, kind: TokenKind.Comma, line: 1, literal: ',' },
          { column: 13, kind: TokenKind.Int, line: 1, literal: '3' },
          { column: 15, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 17, kind: TokenKind.Int, line: 1, literal: '3' },
          { column: 18, kind: TokenKind.RightBracket, line: 1, literal: ']' }
        ]
      }
    ]
  }
};
