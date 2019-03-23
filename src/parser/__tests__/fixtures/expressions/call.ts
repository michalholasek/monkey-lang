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
  },
  'fn(x) { x; }(5);': {
    statements: [
      {
        expression: {
          arguments: [
            {
              tokens: [{ column: 15, kind: TokenKind.Int, line: 1, literal: '5' }],
              value: 5
            }
          ],
          value: {
            body: {
              statements: [{
                expression: {
                  tokens: [{ column: 10, kind: TokenKind.Identifier, line: 1, literal: 'x' }],
                  value: 'x'
                },
                kind: NodeKind.Expression,
                tokens: [{ column: 10, kind: TokenKind.Identifier, line: 1, literal: 'x' }]
              }],
              tokens: [
                { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'x' },
                { column: 11, kind: TokenKind.Semicolon, line: 1, literal: ';' }
              ]
            },
            parameters: [{ column: 5, kind: TokenKind.Identifier, line: 1, literal: 'x' }]
          },
          tokens: [
            { column: 2, kind: TokenKind.Function, line: 1, literal: 'fn' },
            { column: 4, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
            { column: 5, kind: TokenKind.Identifier, line: 1, literal: 'x' },
            { column: 6, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
            { column: 8, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
            { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'x' },
            { column: 11, kind: TokenKind.Semicolon, line: 1, literal: ';' },
            { column: 13, kind: TokenKind.RightBrace, line: 1, literal: '}' },
            { column: 14, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
            { column: 15, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 16, kind: TokenKind.RightParenthesis, line: 1, literal: ')' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Function, line: 1, literal: 'fn' },
          { column: 4, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
          { column: 5, kind: TokenKind.Identifier, line: 1, literal: 'x' },
          { column: 6, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
          { column: 8, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
          { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'x' },
          { column: 11, kind: TokenKind.Semicolon, line: 1, literal: ';' },
          { column: 13, kind: TokenKind.RightBrace, line: 1, literal: '}' },
          { column: 14, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
          { column: 15, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 16, kind: TokenKind.RightParenthesis, line: 1, literal: ')' }
        ]
      }
    ]
  }
};
