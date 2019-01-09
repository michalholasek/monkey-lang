import { TokenKind } from '../../lexer/types';
import { StatementKind } from '../ast/types';

export const Statements = {
  Empty: { statements: [] },
  Error: {
    InvalidToken: {
      errors: [
        { message: 'invalid token(6, 1): expected Identifier, got Let instead' },
        { message: 'invalid token(10, 1): expected Identifier, got Assign instead' }
      ],
      statements: []
    }
  },
  Let: {
    statements: [
      {
        expression: {
          tokens: [{ column: 16, kind: 3, line: 2, literal: '5' }],
          value: 5
        },
        kind: StatementKind.Let,
        name: { column: 12, kind: 2, line: 2, literal: 'x' },
        tokens: [
          { column: 8, kind: 17, line: 2, literal: 'let' },
          { column: 12, kind: 2, line: 2, literal: 'x' },
          { column: 14, kind: 4, line: 2, literal: '=' },
          { column: 16, kind: 3, line: 2, literal: '5' }
        ]
      },
      {
        expression: {
          tokens: [{ column: 16, kind: 3, line: 3, literal: '10' }],
          value: 10
        },
        kind: StatementKind.Let,
        name: { column: 12, kind: 2, line: 3, literal: 'y' },
        tokens: [
          { column: 8, kind: 17, line: 3, literal: 'let' },
          { column: 12, kind: 2, line: 3, literal: 'y' },
          { column: 14, kind: 4, line: 3, literal: '=' },
          { column: 16, kind: 3, line: 3, literal: '10' }
        ]
      },
      {
        expression: {
          tokens: [{ column: 21, kind: 3, line: 4, literal: '838383' }],
          value: 838383
        },
        kind: StatementKind.Let,
        name: { column: 12, kind: 2, line: 4, literal: 'foobar' },
        tokens: [
          { column: 8, kind: 17, line: 4, literal: 'let' },
          { column: 12, kind: 2, line: 4, literal: 'foobar' },
          { column: 19, kind: 4, line: 4, literal: '=' },
          { column: 21, kind: 3, line: 4, literal: '838383' }
        ]
      }
    ]
  },
  Return: {
    statements: [
      {
        expression: {
          tokens: [{ column: 15, kind: 3, line: 2, literal: '5' }],
          value: 5
        },
        kind: StatementKind.Return,
        tokens: [
          { column: 8, kind: 22, line: 2, literal: 'return' },
          { column: 15, kind: 3, line: 2, literal: '5' }
        ]
      },
      {
        expression: {
          tokens: [{ column: 15, kind: 3, line: 3, literal: '10' }],
          value: 10
        },
        kind: StatementKind.Return,
        tokens: [
          { column: 8, kind: 22, line: 3, literal: 'return' },
          { column: 15, kind: 3, line: 3, literal: '10' }
        ]
      },
      {
        expression: {
          tokens: [{ column: 15, kind: 3, line: 4, literal: '993322' }],
          value: 993322
        },
        kind: StatementKind.Return,
        tokens: [
          { column: 8, kind: 22, line: 4, literal: 'return' },
          { column: 15, kind: 3, line: 4, literal: '993322' }
        ]
      }
    ]
  }
};

export const Expressions = {
  Identifier: {
    statements: [
      {
        expression: {
          tokens: [{ column: 2, kind: 2, line: 1, literal: 'foobar' }],
          value: 'foobar'
        },
        kind: StatementKind.Expression,
        tokens: [{ column: 2, kind: 2, line: 1, literal: 'foobar' }]
      }
    ]
  },
  Integer: {
    statements: [
      {
        expression: {
          tokens: [{ column: 2, kind: 3, line: 1, literal: '5' }],
          value: 5
        },
        kind: StatementKind.Expression,
        tokens: [{ column: 2, kind: 3, line: 1, literal: '5' }]
      }
    ]
  }
};
