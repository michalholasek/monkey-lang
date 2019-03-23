import { TokenKind } from '../../../../lexer/types';
import { NodeKind } from '../../../ast/types';

export const Call = {
  'add(1, 2 * 3, 4 + 5);': {
    statements: [
      {
        expression: {
          arguments: [
            {
              tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '1' }],
              value: 1
            },
            {
              left: {
                tokens: [{ column: 9, kind: TokenKind.Int, line: 1, literal: '2' }],
                value: 2
              },
              operator: { column: 11, kind: TokenKind.Asterisk, line: 1, literal: '*' },
              right: {
                tokens: [{ column: 13, kind: TokenKind.Int, line: 1, literal: '3' }],
                value: 3
              },
              tokens: [
                { column: 9, kind: TokenKind.Int, line: 1, literal: '2' },
                { column: 11, kind: TokenKind.Asterisk, line: 1, literal: '*' },
                { column: 13, kind: TokenKind.Int, line: 1, literal: '3' }
              ]
            },
            {
              left: {
                tokens: [{ column: 16, kind: TokenKind.Int, line: 1, literal: '4' }],
                value: 4
              },
              operator: { column: 18, kind: TokenKind.Plus, line: 1, literal: '+' },
              right: {
                tokens: [{ column: 20, kind: TokenKind.Int, line: 1, literal: '5' }],
                value: 5
              },
              tokens: [
                { column: 16, kind: TokenKind.Int, line: 1, literal: '4' },
                { column: 18, kind: TokenKind.Plus, line: 1, literal: '+' },
                { column: 20, kind: TokenKind.Int, line: 1, literal: '5' }
              ]
            }
          ],
          identifier: { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'add' },
          tokens: [
            { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'add' },
            { column: 5, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '1' },
            { column: 7, kind: TokenKind.Comma, line: 1, literal: ',' },
            { column: 9, kind: TokenKind.Int, line: 1, literal: '2' },
            { column: 11, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            { column: 13, kind: TokenKind.Int, line: 1, literal: '3' },
            { column: 14, kind: TokenKind.Comma, line: 1, literal: ',' },
            { column: 16, kind: TokenKind.Int, line: 1, literal: '4' },
            { column: 18, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 20, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 21, kind: TokenKind.RightParenthesis, line: 1, literal: ')' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'add' },
          { column: 5, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '1' },
          { column: 7, kind: TokenKind.Comma, line: 1, literal: ',' },
          { column: 9, kind: TokenKind.Int, line: 1, literal: '2' },
          { column: 11, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          { column: 13, kind: TokenKind.Int, line: 1, literal: '3' },
          { column: 14, kind: TokenKind.Comma, line: 1, literal: ',' },
          { column: 16, kind: TokenKind.Int, line: 1, literal: '4' },
          { column: 18, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 20, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 21, kind: TokenKind.RightParenthesis, line: 1, literal: ')' }
        ]
      }
    ]
  }
};
