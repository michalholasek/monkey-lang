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
          tokens: [{ column: 16, kind: TokenKind.Int, line: 2, literal: '5' }],
          value: 5
        },
        kind: StatementKind.Let,
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
        kind: StatementKind.Let,
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
        kind: StatementKind.Let,
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
        kind: StatementKind.Return,
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
        kind: StatementKind.Return,
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
        kind: StatementKind.Return,
        tokens: [
          { column: 8, kind: TokenKind.Return, line: 4, literal: 'return' },
          { column: 15, kind: TokenKind.Int, line: 4, literal: '993322' }
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
          tokens: [{ column: 2, kind: TokenKind.Identifier, line: 1, literal: 'foobar' }],
          value: 'foobar'
        },
        kind: StatementKind.Expression,
        tokens: [{ column: 2, kind: TokenKind.Identifier, line: 1, literal: 'foobar' }]
      }
    ]
  },
  Integer: {
    statements: [
      {
        expression: {
          tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }],
          value: 5
        },
        kind: StatementKind.Expression,
        tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }]
      }
    ]
  },
  Prefix: {
    statements: [
      {
        expression: {
          left: {
            operator: { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
            tokens: [
              { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
              { column: 3, kind: TokenKind.Int, line: 1, literal: '5' }
            ],
            value: 5
          },
          tokens: [
            { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
            { column: 3, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
          { column: 3, kind: TokenKind.Int, line: 1, literal: '5' }
        ]
      },
      {
        expression: {
          left: {
            operator: { column: 5, kind: TokenKind.Minus, line: 1, literal: '-' },
            tokens: [
              { column: 5, kind: TokenKind.Minus, line: 1, literal: '-' },
              { column: 6, kind: TokenKind.Int, line: 1, literal: '15' }
            ],
            value: 15
          },
          tokens: [
            { column: 5, kind: TokenKind.Minus, line: 1, literal: '-' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '15' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 5, kind: TokenKind.Minus, line: 1, literal: '-' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '15' }
        ]
      }
    ]
  },
  Infix: {
    statements: [
      {
        expression: {
          left: {
            tokens: [{ column: 8, kind: TokenKind.Int, line: 2, literal: '5' }],
            value: 5
          },
          operator: { column: 10, kind: TokenKind.Plus, line: 2, literal: '+' },
          right: {
            tokens: [{ column: 12, kind: TokenKind.Int, line: 2, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 8, kind: TokenKind.Int, line: 2, literal: '5' },
            { column: 10, kind: TokenKind.Plus, line: 2, literal: '+' },
            { column: 12, kind: TokenKind.Int, line: 2, literal: '5' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 8, kind: TokenKind.Int, line: 2, literal: '5' },
          { column: 10, kind: TokenKind.Plus, line: 2, literal: '+' },
          { column: 12, kind: TokenKind.Int, line: 2, literal: '5' }
        ]
      },
      {
        expression: {
          left: {
            tokens: [{ column: 8, kind: TokenKind.Int, line: 3, literal: '5' }],
            value: 5
          },
          operator: { column: 10, kind: TokenKind.Minus, line: 3, literal: '-' },
          right: {
            tokens: [{ column: 12, kind: TokenKind.Int, line: 3, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 8, kind: TokenKind.Int, line: 3, literal: '5' },
            { column: 10, kind: TokenKind.Minus, line: 3, literal: '-' },
            { column: 12, kind: TokenKind.Int, line: 3, literal: '5' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 8, kind: TokenKind.Int, line: 3, literal: '5' },
          { column: 10, kind: TokenKind.Minus, line: 3, literal: '-' },
          { column: 12, kind: TokenKind.Int, line: 3, literal: '5' }
        ]
      },
      {
        expression: {
          left: {
            tokens: [{ column: 8, kind: TokenKind.Int, line: 4, literal: '5' }],
            value: 5
          },
          operator: { column: 10, kind: TokenKind.Asterisk, line: 4, literal: '*' },
          right: {
            tokens: [{ column: 12, kind: TokenKind.Int, line: 4, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 8, kind: TokenKind.Int, line: 4, literal: '5' },
            { column: 10, kind: TokenKind.Asterisk, line: 4, literal: '*' },
            { column: 12, kind: TokenKind.Int, line: 4, literal: '5' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 8, kind: TokenKind.Int, line: 4, literal: '5' },
          { column: 10, kind: TokenKind.Asterisk, line: 4, literal: '*' },
          { column: 12, kind: TokenKind.Int, line: 4, literal: '5' }
        ]
      },
      {
        expression: {
          left: {
            tokens: [{ column: 8, kind: TokenKind.Int, line: 5, literal: '5' }],
            value: 5
          },
          operator: { column: 10, kind: TokenKind.Slash, line: 5, literal: '/' },
          right: {
            tokens: [{ column: 12, kind: TokenKind.Int, line: 5, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 8, kind: TokenKind.Int, line: 5, literal: '5' },
            { column: 10, kind: TokenKind.Slash, line: 5, literal: '/' },
            { column: 12, kind: TokenKind.Int, line: 5, literal: '5' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 8, kind: TokenKind.Int, line: 5, literal: '5' },
          { column: 10, kind: TokenKind.Slash, line: 5, literal: '/' },
          { column: 12, kind: TokenKind.Int, line: 5, literal: '5' }
        ]
      },
      {
        expression: {
          left: {
            tokens: [{ column: 8, kind: TokenKind.Int, line: 6, literal: '5' }],
            value: 5
          },
          operator: { column: 10, kind: TokenKind.GreatThan, line: 6, literal: '>' },
          right: {
            tokens: [{ column: 12, kind: TokenKind.Int, line: 6, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 8, kind: TokenKind.Int, line: 6, literal: '5' },
            { column: 10, kind: TokenKind.GreatThan, line: 6, literal: '>' },
            { column: 12, kind: TokenKind.Int, line: 6, literal: '5' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 8, kind: TokenKind.Int, line: 6, literal: '5' },
          { column: 10, kind: TokenKind.GreatThan, line: 6, literal: '>' },
          { column: 12, kind: TokenKind.Int, line: 6, literal: '5' }
        ]
      },
      {
        expression: {
          left: {
            tokens: [{ column: 8, kind: TokenKind.Int, line: 7, literal: '5' }],
            value: 5
          },
          operator: { column: 10, kind: TokenKind.LessThan, line: 7, literal: '<' },
          right: {
            tokens: [{ column: 12, kind: TokenKind.Int, line: 7, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 8, kind: TokenKind.Int, line: 7, literal: '5' },
            { column: 10, kind: TokenKind.LessThan, line: 7, literal: '<' },
            { column: 12, kind: TokenKind.Int, line: 7, literal: '5' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 8, kind: TokenKind.Int, line: 7, literal: '5' },
          { column: 10, kind: TokenKind.LessThan, line: 7, literal: '<' },
          { column: 12, kind: TokenKind.Int, line: 7, literal: '5' }
        ]
      },
      {
        expression: {
          left: {
            tokens: [{ column: 8, kind: TokenKind.Int, line: 8, literal: '5' }],
            value: 5
          },
          operator: { column: 10, kind: TokenKind.Equal, line: 8, literal: '==' },
          right: {
            tokens: [{ column: 13, kind: TokenKind.Int, line: 8, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 8, kind: TokenKind.Int, line: 8, literal: '5' },
            { column: 10, kind: TokenKind.Equal, line: 8, literal: '==' },
            { column: 13, kind: TokenKind.Int, line: 8, literal: '5' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 8, kind: TokenKind.Int, line: 8, literal: '5' },
          { column: 10, kind: TokenKind.Equal, line: 8, literal: '==' },
          { column: 13, kind: TokenKind.Int, line: 8, literal: '5' }
        ]
      },
      {
        expression: {
          left: {
            tokens: [{ column: 8, kind: TokenKind.Int, line: 9, literal: '5' }],
            value: 5
          },
          operator: { column: 10, kind: TokenKind.NotEqual, line: 9, literal: '!=' },
          right: {
            tokens: [{ column: 13, kind: TokenKind.Int, line: 9, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 8, kind: TokenKind.Int, line: 9, literal: '5' },
            { column: 10, kind: TokenKind.NotEqual, line: 9, literal: '!=' },
            { column: 13, kind: TokenKind.Int, line: 9, literal: '5' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 8, kind: TokenKind.Int, line: 9, literal: '5' },
          { column: 10, kind: TokenKind.NotEqual, line: 9, literal: '!=' },
          { column: 13, kind: TokenKind.Int, line: 9, literal: '5' }
        ]
      }
    ]
  }
};
