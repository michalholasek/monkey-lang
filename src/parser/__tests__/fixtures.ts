import { StatementKind } from '../../ast/types';
import { TokenKind } from '../../lexer/types';

export const Statements = {
  Empty: { statements: [] },
  Error: {
    InvalidToken: {
      errors: [
        { message: 'invalid token: expected Identifier, got Let instead' },
        { message: 'invalid token: expected Identifier, got Assign instead' }
      ],
      statements: []
    }
  },
  Let: {
    statements: [
      {
        expression: {
          tokens: [{ kind: TokenKind.Int, literal: '5' }],
          value: '5'
        },
        kind: StatementKind.Let,
        name: { kind: TokenKind.Identifier, literal: 'x' },
        tokens: [
          { kind: TokenKind.Let, literal: 'let' },
          { kind: TokenKind.Identifier, literal: 'x' },
          { kind: TokenKind.Assign, literal: '=' },
          { kind: TokenKind.Int, literal: '5' }
        ]
      },
      {
        expression: {
          tokens: [{ kind: TokenKind.Int, literal: '10' }],
          value: '10'
        },
        kind: StatementKind.Let,
        name: { kind: TokenKind.Identifier, literal: 'y' },
        tokens: [
          { kind: TokenKind.Let, literal: 'let' },
          { kind: TokenKind.Identifier, literal: 'y' },
          { kind: TokenKind.Assign, literal: '=' },
          { kind: TokenKind.Int, literal: '10' }
        ]
      },
      {
        expression: {
          tokens: [{ kind: TokenKind.Int, literal: '838383' }],
          value: '838383'
        },
        kind: StatementKind.Let,
        name: { kind: TokenKind.Identifier, literal: 'foobar' },
        tokens: [
          { kind: TokenKind.Let, literal: 'let' },
          { kind: TokenKind.Identifier, literal: 'foobar' },
          { kind: TokenKind.Assign, literal: '=' },
          { kind: TokenKind.Int, literal: '838383' }
        ]
      }
    ]
  }
};
