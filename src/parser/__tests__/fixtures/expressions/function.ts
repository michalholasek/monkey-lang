import { TokenKind } from '../../../../lexer/types';
import { StatementKind } from '../../../ast/types';

export const Function = {
  'fn() { x + y; }': {
    statements: [
      {
        expression: {
          tokens: [
            { column: 2, kind: TokenKind.Function, line: 1, literal: 'fn' },
            { column: 4, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
            { column: 5, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
            { column: 7, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
            { column: 9, kind: TokenKind.Identifier, line: 1, literal: 'x' },
            { column: 11, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 13, kind: TokenKind.Identifier, line: 1, literal: 'y' },
            { column: 14, kind: TokenKind.Semicolon, line: 1, literal: ';' },
            { column: 16, kind: TokenKind.RightBrace, line: 1, literal: '}' }
          ],
          value: {
            body: {
              statements: [{
                expression: {
                  left: {
                    tokens: [{ column: 9, kind: TokenKind.Identifier, line: 1, literal: 'x' }],
                    value: 'x'
                  },
                  operator: { column: 11, kind: TokenKind.Plus, line: 1, literal: '+' },
                  right: {
                    tokens: [{ column: 13, kind: TokenKind.Identifier, line: 1, literal: 'y' }],
                    value: 'y'
                  },
                  tokens: [
                    { column: 9, kind: TokenKind.Identifier, line: 1, literal: 'x' },
                    { column: 11, kind: TokenKind.Plus, line: 1, literal: '+' },
                    { column: 13, kind: TokenKind.Identifier, line: 1, literal: 'y' }
                  ]
                },
                kind: StatementKind.Expression,
                tokens: [
                  { column: 9, kind: TokenKind.Identifier, line: 1, literal: 'x' },
                  { column: 11, kind: TokenKind.Plus, line: 1, literal: '+' },
                  { column: 13, kind: TokenKind.Identifier, line: 1, literal: 'y' }
                ]
              }],
              tokens: [
                { column: 9, kind: TokenKind.Identifier, line: 1, literal: 'x' },
                { column: 11, kind: TokenKind.Plus, line: 1, literal: '+' },
                { column: 13, kind: TokenKind.Identifier, line: 1, literal: 'y' },
                { column: 14, kind: TokenKind.Semicolon, line: 1, literal: ';' }
              ]
            },
            parameters: [],
            tokens: [
              { column: 2, kind: TokenKind.Function, line: 1, literal: 'fn' },
              { column: 4, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
              { column: 5, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
              { column: 7, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
              { column: 9, kind: TokenKind.Identifier, line: 1, literal: 'x' },
              { column: 11, kind: TokenKind.Plus, line: 1, literal: '+' },
              { column: 13, kind: TokenKind.Identifier, line: 1, literal: 'y' },
              { column: 14, kind: TokenKind.Semicolon, line: 1, literal: ';' },
              { column: 16, kind: TokenKind.RightBrace, line: 1, literal: '}' }
            ]
          }
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Function, line: 1, literal: 'fn' },
          { column: 4, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
          { column: 5, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
          { column: 7, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
          { column: 9, kind: TokenKind.Identifier, line: 1, literal: 'x' },
          { column: 11, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 13, kind: TokenKind.Identifier, line: 1, literal: 'y' },
          { column: 14, kind: TokenKind.Semicolon, line: 1, literal: ';' },
          { column: 16, kind: TokenKind.RightBrace, line: 1, literal: '}' }
        ]
      }
    ]
  },
  'fn(x, y) { x + y; }': {
    statements: [
      {
        expression: {
          tokens: [
            { column: 2, kind: TokenKind.Function, line: 1, literal: 'fn' },
            { column: 4, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
            { column: 5, kind: TokenKind.Identifier, line: 1, literal: 'x' },
            { column: 6, kind: TokenKind.Comma, line: 1, literal: ',' },
            { column: 8, kind: TokenKind.Identifier, line: 1, literal: 'y' },
            { column: 9, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
            { column: 11, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
            { column: 13, kind: TokenKind.Identifier, line: 1, literal: 'x' },
            { column: 15, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 17, kind: TokenKind.Identifier, line: 1, literal: 'y' },
            { column: 18, kind: TokenKind.Semicolon, line: 1, literal: ';' },
            { column: 20, kind: TokenKind.RightBrace, line: 1, literal: '}' }
          ],
          value: {
            body: {
              statements: [{
                expression: {
                  left: {
                    tokens: [{ column: 13, kind: TokenKind.Identifier, line: 1, literal: 'x' }],
                    value: 'x'
                  },
                  operator: { column: 15, kind: TokenKind.Plus, line: 1, literal: '+' },
                  right: {
                    tokens: [{ column: 17, kind: TokenKind.Identifier, line: 1, literal: 'y' }],
                    value: 'y'
                  },
                  tokens: [
                    { column: 13, kind: TokenKind.Identifier, line: 1, literal: 'x' },
                    { column: 15, kind: TokenKind.Plus, line: 1, literal: '+' },
                    { column: 17, kind: TokenKind.Identifier, line: 1, literal: 'y' }
                  ]
                },
                kind: StatementKind.Expression,
                tokens: [
                  { column: 13, kind: TokenKind.Identifier, line: 1, literal: 'x' },
                  { column: 15, kind: TokenKind.Plus, line: 1, literal: '+' },
                  { column: 17, kind: TokenKind.Identifier, line: 1, literal: 'y' }
                ]
              }],
              tokens: [
                { column: 13, kind: TokenKind.Identifier, line: 1, literal: 'x' },
                { column: 15, kind: TokenKind.Plus, line: 1, literal: '+' },
                { column: 17, kind: TokenKind.Identifier, line: 1, literal: 'y' },
                { column: 18, kind: TokenKind.Semicolon, line: 1, literal: ';' }
              ]
            },
            parameters: [
              { column: 5, kind: TokenKind.Identifier, line: 1, literal: 'x' },
              { column: 8, kind: TokenKind.Identifier, line: 1, literal: 'y' }
            ],
            tokens: [
              { column: 2, kind: TokenKind.Function, line: 1, literal: 'fn' },
              { column: 4, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
              { column: 5, kind: TokenKind.Identifier, line: 1, literal: 'x' },
              { column: 6, kind: TokenKind.Comma, line: 1, literal: ',' },
              { column: 8, kind: TokenKind.Identifier, line: 1, literal: 'y' },
              { column: 9, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
              { column: 11, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
              { column: 13, kind: TokenKind.Identifier, line: 1, literal: 'x' },
              { column: 15, kind: TokenKind.Plus, line: 1, literal: '+' },
              { column: 17, kind: TokenKind.Identifier, line: 1, literal: 'y' },
              { column: 18, kind: TokenKind.Semicolon, line: 1, literal: ';' },
              { column: 20, kind: TokenKind.RightBrace, line: 1, literal: '}' }
            ]
          }
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Function, line: 1, literal: 'fn' },
          { column: 4, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
          { column: 5, kind: TokenKind.Identifier, line: 1, literal: 'x' },
          { column: 6, kind: TokenKind.Comma, line: 1, literal: ',' },
          { column: 8, kind: TokenKind.Identifier, line: 1, literal: 'y' },
          { column: 9, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
          { column: 11, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
          { column: 13, kind: TokenKind.Identifier, line: 1, literal: 'x' },
          { column: 15, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 17, kind: TokenKind.Identifier, line: 1, literal: 'y' },
          { column: 18, kind: TokenKind.Semicolon, line: 1, literal: ';' },
          { column: 20, kind: TokenKind.RightBrace, line: 1, literal: '}' }
        ]
      }
    ]
  }
};
