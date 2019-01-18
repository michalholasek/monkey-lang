import { TokenKind } from '../../../../lexer/types';
import { StatementKind } from '../../../ast/types';

export const If = {
  'if (x < y) { x; }': {
    statements: [
      {
        expression: {
          condition: {
            left: {
              tokens: [{ column: 6, kind: TokenKind.Identifier, line: 1, literal: 'x' }],
              value: 'x'
            },
            operator: { column: 8, kind: TokenKind.LessThan, line: 1, literal: '<' },
            right: {
              tokens: [{ column: 10, kind: TokenKind.Identifier, line: 1, literal: 'y' }],
              value: 'y'
            },
            tokens: [
              { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'x' },
              { column: 8, kind: TokenKind.LessThan, line: 1, literal: '<' },
              { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'y' }
            ]
          },
          consequence: {
            statements: [{
              expression: {
                tokens: [{ column: 15, kind: TokenKind.Identifier, line: 1, literal: 'x' }],
                value: 'x'
              },
              kind: StatementKind.Expression,
              tokens: [{ column: 15, kind: TokenKind.Identifier, line: 1, literal: 'x' }]
            }],
            tokens: [
              { column: 15, kind: TokenKind.Identifier, line: 1, literal: 'x' },
              { column: 16, kind: TokenKind.Semicolon, line: 1, literal: ';' }
            ]
          },
          tokens: [
            { column: 2, kind: TokenKind.If, line: 1, literal: 'if' },
            { column: 5, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
            { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'x' },
            { column: 8, kind: TokenKind.LessThan, line: 1, literal: '<' },
            { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'y' },
            { column: 11, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
            { column: 13, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
            { column: 15, kind: TokenKind.Identifier, line: 1, literal: 'x' },
            { column: 16, kind: TokenKind.Semicolon, line: 1, literal: ';' },
            { column: 18, kind: TokenKind.RightBrace, line: 1, literal: '}' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.If, line: 1, literal: 'if' },
          { column: 5, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
          { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'x' },
          { column: 8, kind: TokenKind.LessThan, line: 1, literal: '<' },
          { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'y' },
          { column: 11, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
          { column: 13, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
          { column: 15, kind: TokenKind.Identifier, line: 1, literal: 'x' },
          { column: 16, kind: TokenKind.Semicolon, line: 1, literal: ';' },
          { column: 18, kind: TokenKind.RightBrace, line: 1, literal: '}' }
        ]
      }
    ]
  },
  'if (x < y) { x; } else { y; }': {
    statements: [
      {
        expression: {
          condition: {
            left: {
              tokens: [{ column: 6, kind: TokenKind.Identifier, line: 1, literal: 'x' }],
              value: 'x'
            },
            operator: { column: 8, kind: TokenKind.LessThan, line: 1, literal: '<' },
            right: {
              tokens: [{ column: 10, kind: TokenKind.Identifier, line: 1, literal: 'y' }],
              value: 'y'
            },
            tokens: [
              { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'x' },
              { column: 8, kind: TokenKind.LessThan, line: 1, literal: '<' },
              { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'y' }
            ]
          },
          consequence: {
            statements: [{
              expression: {
                tokens: [{ column: 15, kind: TokenKind.Identifier, line: 1, literal: 'x' }],
                value: 'x'
              },
              kind: StatementKind.Expression,
              tokens: [{ column: 15, kind: TokenKind.Identifier, line: 1, literal: 'x' }]
            }],
            tokens: [
              { column: 15, kind: TokenKind.Identifier, line: 1, literal: 'x' },
              { column: 16, kind: TokenKind.Semicolon, line: 1, literal: ';' }
            ]
          },
          alternative: {
            statements: [{
              expression: {
                tokens: [{ column: 27, kind: TokenKind.Identifier, line: 1, literal: 'y' }],
                value: 'y'
              },
              kind: StatementKind.Expression,
              tokens: [{ column: 27, kind: TokenKind.Identifier, line: 1, literal: 'y' }]
            }],
            tokens: [
              { column: 27, kind: TokenKind.Identifier, line: 1, literal: 'y' },
              { column: 28, kind: TokenKind.Semicolon, line: 1, literal: ';' }
            ]
          },
          tokens: [
            { column: 2, kind: TokenKind.If, line: 1, literal: 'if' },
            { column: 5, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
            { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'x' },
            { column: 8, kind: TokenKind.LessThan, line: 1, literal: '<' },
            { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'y' },
            { column: 11, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
            { column: 13, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
            { column: 15, kind: TokenKind.Identifier, line: 1, literal: 'x' },
            { column: 16, kind: TokenKind.Semicolon, line: 1, literal: ';' },
            { column: 18, kind: TokenKind.RightBrace, line: 1, literal: '}' },
            { column: 20, kind: TokenKind.Else, line: 1, literal: 'else' },
            { column: 25, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
            { column: 27, kind: TokenKind.Identifier, line: 1, literal: 'y' },
            { column: 28, kind: TokenKind.Semicolon, line: 1, literal: ';' },
            { column: 30, kind: TokenKind.RightBrace, line: 1, literal: '}' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.If, line: 1, literal: 'if' },
          { column: 5, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
          { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'x' },
          { column: 8, kind: TokenKind.LessThan, line: 1, literal: '<' },
          { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'y' },
          { column: 11, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
          { column: 13, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
          { column: 15, kind: TokenKind.Identifier, line: 1, literal: 'x' },
          { column: 16, kind: TokenKind.Semicolon, line: 1, literal: ';' },
          { column: 18, kind: TokenKind.RightBrace, line: 1, literal: '}' },
          { column: 20, kind: TokenKind.Else, line: 1, literal: 'else' },
          { column: 25, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
          { column: 27, kind: TokenKind.Identifier, line: 1, literal: 'y' },
          { column: 28, kind: TokenKind.Semicolon, line: 1, literal: ';' },
          { column: 30, kind: TokenKind.RightBrace, line: 1, literal: '}' }
        ]
      }
    ]
  }
};
