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
    '!5;': {
      statements: [
        {
          expression: {
            left: {
              operator: { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
              tokens: [{ column: 2, kind: TokenKind.Bang, line: 1, literal: '!' }]
            },
            right: {
              tokens: [{ column: 3, kind: TokenKind.Int, line: 1, literal: '5' }],
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
        }
      ]
    },
    '-15;': {
      statements: [
        {
          expression: {
            left: {
              operator: { column: 2, kind: TokenKind.Minus, line: 1, literal: '-' },
              tokens: [{ column: 2, kind: TokenKind.Minus, line: 1, literal: '-' }]
            },
            right: {
              tokens: [{ column: 3, kind: TokenKind.Int, line: 1, literal: '15' }],
              value: 15
            },
            tokens: [
              { column: 2, kind: TokenKind.Minus, line: 1, literal: '-' },
              { column: 3, kind: TokenKind.Int, line: 1, literal: '15' }
            ]
          },
          kind: StatementKind.Expression,
          tokens: [
            { column: 2, kind: TokenKind.Minus, line: 1, literal: '-' },
            { column: 3, kind: TokenKind.Int, line: 1, literal: '15' }
          ]
        }
      ]
    },
    '!true;': {
      statements: [
        {
          expression: {
            left: {
              operator: { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
              tokens: [{ column: 2, kind: TokenKind.Bang, line: 1, literal: '!' }]
            },
            right: {
              tokens: [{ column: 3, kind: TokenKind.True, line: 1, literal: 'true' }],
              value: true
            },
            tokens: [
              { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
              { column: 3, kind: TokenKind.True, line: 1, literal: 'true' }
            ]
          },
          kind: StatementKind.Expression,
          tokens: [
            { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
            { column: 3, kind: TokenKind.True, line: 1, literal: 'true' }
          ]
        }
      ]
    },
    '!false;': {
      statements: [
        {
          expression: {
            left: {
              operator: { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
              tokens: [{ column: 2, kind: TokenKind.Bang, line: 1, literal: '!' }]
            },
            right: {
              tokens: [{ column: 3, kind: TokenKind.False, line: 1, literal: 'false' }],
              value: false
            },
            tokens: [
              { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
              { column: 3, kind: TokenKind.False, line: 1, literal: 'false' }
            ]
          },
          kind: StatementKind.Expression,
          tokens: [
            { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
            { column: 3, kind: TokenKind.False, line: 1, literal: 'false' }
          ]
        }
      ]
    }
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
  },
  OperatorPrecedence: {
    '-a * b;': {
      statements: [{
        expression: {
          left: {
            left: {
              operator: { column: 2, kind: TokenKind.Minus, line: 1, literal: '-' },
              tokens: [{ column: 2, kind: TokenKind.Minus, line: 1, literal: '-' }]
            },
            right: {
              tokens: [{ column: 3, kind: TokenKind.Identifier, line: 1, literal: 'a' }],
              value: 'a'
            },
            tokens: [
              { column: 2, kind: TokenKind.Minus, line: 1, literal: '-' },
              { column: 3, kind: TokenKind.Identifier, line: 1, literal: 'a' }
            ]
          },
          operator: { column: 5, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          right: {
            tokens: [{ column: 7, kind: TokenKind.Identifier, line: 1, literal: 'b' }],
            value: 'b'
          },
          tokens: [
            { column: 2, kind: TokenKind.Minus, line: 1, literal: '-' },
            { column: 3, kind: TokenKind.Identifier, line: 1, literal: 'a' },
            { column: 5, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            { column: 7, kind: TokenKind.Identifier, line: 1, literal: 'b' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Minus, line: 1, literal: '-' },
          { column: 3, kind: TokenKind.Identifier, line: 1, literal: 'a' },
          { column: 5, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          { column: 7, kind: TokenKind.Identifier, line: 1, literal: 'b' }
        ]
      }]
    },
    '!-a;': {
      statements: [{
        expression: {
          left: {
            operator: { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
            tokens: [{ column: 2, kind: TokenKind.Bang, line: 1, literal: '!' }]
          },
          right: {
            left: {
              operator: { column: 3, kind: TokenKind.Minus, line: 1, literal: '-' },
              tokens: [{ column: 3, kind: TokenKind.Minus, line: 1, literal: '-' }]
            },
            right: {
              tokens: [{ column: 4, kind: TokenKind.Identifier, line: 1, literal: 'a' }],
              value: 'a'
            },
            tokens: [
              { column: 3, kind: TokenKind.Minus, line: 1, literal: '-' },
              { column: 4, kind: TokenKind.Identifier, line: 1, literal: 'a' }
            ]
          },
          tokens: [
            { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
            { column: 3, kind: TokenKind.Minus, line: 1, literal: '-' },
            { column: 4, kind: TokenKind.Identifier, line: 1, literal: 'a' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
          { column: 3, kind: TokenKind.Minus, line: 1, literal: '-' },
          { column: 4, kind: TokenKind.Identifier, line: 1, literal: 'a' }
        ]
      }]
    },
    'a + b + c;': {
      statements: [{
        expression: {
          left: {
            left: {
              tokens: [{ column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' }],
              value: 'a'
            },
            operator: { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
            right: {
              tokens: [{ column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' }],
              value: 'b'
            },
            tokens: [
              { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
              { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
              { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' }
            ]
          },
          operator: { column: 8, kind: TokenKind.Plus, line: 1, literal: '+' },
          right: {
            tokens: [{ column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }],
            value: 'c'
          },
          tokens: [
            { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
            { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
            { column: 8, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
          { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
          { column: 8, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
        ]
      }]
    },
    'a + b - c;': {
      statements: [{
        expression: {
          left: {
            left: {
              tokens: [{ column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' }],
              value: 'a'
            },
            operator: { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
            right: {
              tokens: [{ column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' }],
              value: 'b'
            },
            tokens: [
              { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
              { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
              { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' }
            ]
          },
          operator: { column: 8, kind: TokenKind.Minus, line: 1, literal: '-' },
          right: {
            tokens: [{ column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }],
            value: 'c'
          },
          tokens: [
            { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
            { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
            { column: 8, kind: TokenKind.Minus, line: 1, literal: '-' },
            { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
          { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
          { column: 8, kind: TokenKind.Minus, line: 1, literal: '-' },
          { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
        ]
      }]
    },
    'a * b * c;': {
      statements: [{
        expression: {
          left: {
            left: {
              tokens: [{ column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' }],
              value: 'a'
            },
            operator: { column: 4, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            right: {
              tokens: [{ column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' }],
              value: 'b'
            },
            tokens: [
              { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
              { column: 4, kind: TokenKind.Asterisk, line: 1, literal: '*' },
              { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' }
            ]
          },
          operator: { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          right: {
            tokens: [{ column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }],
            value: 'c'
          },
          tokens: [
            { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
            { column: 4, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
            { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
          { column: 4, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
          { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
        ]
      }]
    },
    'a * b / c;': {
      statements: [{
        expression: {
          left: {
            left: {
              tokens: [{ column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' }],
              value: 'a'
            },
            operator: { column: 4, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            right: {
              tokens: [{ column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' }],
              value: 'b'
            },
            tokens: [
              { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
              { column: 4, kind: TokenKind.Asterisk, line: 1, literal: '*' },
              { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' }
            ]
          },
          operator: { column: 8, kind: TokenKind.Slash, line: 1, literal: '/' },
          right: {
            tokens: [{ column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }],
            value: 'c'
          },
          tokens: [
            { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
            { column: 4, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
            { column: 8, kind: TokenKind.Slash, line: 1, literal: '/' },
            { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
          { column: 4, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
          { column: 8, kind: TokenKind.Slash, line: 1, literal: '/' },
          { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
        ]
      }]
    },
    'a + b / c;': {
      statements: [{
        expression: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' }],
            value: 'a'
          },
          operator: { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
          right: {
            left: {
              tokens: [{ column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' }],
              value: 'b'
            },
            operator: { column: 8, kind: TokenKind.Slash, line: 1, literal: '/' },
            right: {
              tokens: [{ column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }],
              value: 'c'
            },
            tokens: [
              { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
              { column: 8, kind: TokenKind.Slash, line: 1, literal: '/' },
              { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
            ]
          },
          tokens: [
            { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
            { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
            { column: 8, kind: TokenKind.Slash, line: 1, literal: '/' },
            { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
          { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
          { column: 8, kind: TokenKind.Slash, line: 1, literal: '/' },
          { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
        ]
      }]
    },
    'a + b * c + d / e - f;': {
      statements: [{
        expression: {
          left: {
            left: {
              left: {
                tokens: [{ column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' }],
                value: 'a'
              },
              operator: { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
              right: {
                left: {
                  tokens: [{ column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' }],
                  value: 'b'
                },
                operator: { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
                right: {
                  tokens: [{ column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }],
                  value: 'c'
                },
                tokens: [
                  { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
                  { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
                  { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
                ]
              },
              tokens: [
                { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
                { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
                { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
                { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
                { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' }
              ]
            },
            operator: { column: 12, kind: TokenKind.Plus, line: 1, literal: '+' },
            right: {
              left: {
                tokens: [{ column: 14, kind: TokenKind.Identifier, line: 1, literal: 'd' }],
                value: 'd'
              },
              operator: { column: 16, kind: TokenKind.Slash, line: 1, literal: '/' },
              right: {
                tokens: [{ column: 18, kind: TokenKind.Identifier, line: 1, literal: 'e' }],
                value: 'e'
              },
              tokens: [
                { column: 14, kind: TokenKind.Identifier, line: 1, literal: 'd' },
                { column: 16, kind: TokenKind.Slash, line: 1, literal: '/' },
                { column: 18, kind: TokenKind.Identifier, line: 1, literal: 'e' }
              ]
            },
            tokens: [
              { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
              { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
              { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
              { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
              { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' },
              { column: 12, kind: TokenKind.Plus, line: 1, literal: '+' },
              { column: 14, kind: TokenKind.Identifier, line: 1, literal: 'd' },
              { column: 16, kind: TokenKind.Slash, line: 1, literal: '/' },
              { column: 18, kind: TokenKind.Identifier, line: 1, literal: 'e' }
            ]
          },
          operator: { column: 20, kind: TokenKind.Minus, line: 1, literal: '-' },
          right: {
            tokens: [{ column: 22, kind: TokenKind.Identifier, line: 1, literal: 'f' }],
            value: 'f'
          },
          tokens: [
            { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
            { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
            { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' },
            { column: 12, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 14, kind: TokenKind.Identifier, line: 1, literal: 'd' },
            { column: 16, kind: TokenKind.Slash, line: 1, literal: '/' },
            { column: 18, kind: TokenKind.Identifier, line: 1, literal: 'e' },
            { column: 20, kind: TokenKind.Minus, line: 1, literal: '-' },
            { column: 22, kind: TokenKind.Identifier, line: 1, literal: 'f' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Identifier, line: 1, literal: 'a' },
          { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 6, kind: TokenKind.Identifier, line: 1, literal: 'b' },
          { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'c' },
          { column: 12, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 14, kind: TokenKind.Identifier, line: 1, literal: 'd' },
          { column: 16, kind: TokenKind.Slash, line: 1, literal: '/' },
          { column: 18, kind: TokenKind.Identifier, line: 1, literal: 'e' },
          { column: 20, kind: TokenKind.Minus, line: 1, literal: '-' },
          { column: 22, kind: TokenKind.Identifier, line: 1, literal: 'f' }
        ]
      }]
    },
    '5 > 4 == 3 < 4;': {
      statements: [{
        expression: {
          left: {
            left: {
              tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }],
              value: 5
            },
            operator: { column: 4, kind: TokenKind.GreatThan, line: 1, literal: '>' },
            right: {
              tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '4' }],
              value: 4
            },
            tokens: [
              { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
              { column: 4, kind: TokenKind.GreatThan, line: 1, literal: '>' },
              { column: 6, kind: TokenKind.Int, line: 1, literal: '4' }
            ]
          },
          operator: { column: 8, kind: TokenKind.Equal, line: 1, literal: '==' },
          right: {
            left: {
              tokens: [{ column: 11, kind: TokenKind.Int, line: 1, literal: '3' }],
              value: 3
            },
            operator: { column: 13, kind: TokenKind.LessThan, line: 1, literal: '<' },
            right: {
              tokens: [{ column: 15, kind: TokenKind.Int, line: 1, literal: '4' }],
              value: 4
            },
            tokens: [
              { column: 11, kind: TokenKind.Int, line: 1, literal: '3' },
              { column: 13, kind: TokenKind.LessThan, line: 1, literal: '<' },
              { column: 15, kind: TokenKind.Int, line: 1, literal: '4' }
            ]
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 4, kind: TokenKind.GreatThan, line: 1, literal: '>' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '4' },
            { column: 8, kind: TokenKind.Equal, line: 1, literal: '==' },
            { column: 11, kind: TokenKind.Int, line: 1, literal: '3' },
            { column: 13, kind: TokenKind.LessThan, line: 1, literal: '<' },
            { column: 15, kind: TokenKind.Int, line: 1, literal: '4' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 4, kind: TokenKind.GreatThan, line: 1, literal: '>' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '4' },
          { column: 8, kind: TokenKind.Equal, line: 1, literal: '==' },
          { column: 11, kind: TokenKind.Int, line: 1, literal: '3' },
          { column: 13, kind: TokenKind.LessThan, line: 1, literal: '<' },
          { column: 15, kind: TokenKind.Int, line: 1, literal: '4' }
        ]
      }]
    },
    '5 < 4 != 3 > 4;': {
      statements: [{
        expression: {
          left: {
            left: {
              tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }],
              value: 5
            },
            operator: { column: 4, kind: TokenKind.LessThan, line: 1, literal: '<' },
            right: {
              tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '4' }],
              value: 4
            },
            tokens: [
              { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
              { column: 4, kind: TokenKind.LessThan, line: 1, literal: '<' },
              { column: 6, kind: TokenKind.Int, line: 1, literal: '4' }
            ]
          },
          operator: { column: 8, kind: TokenKind.NotEqual, line: 1, literal: '!=' },
          right: {
            left: {
              tokens: [{ column: 11, kind: TokenKind.Int, line: 1, literal: '3' }],
              value: 3
            },
            operator: { column: 13, kind: TokenKind.GreatThan, line: 1, literal: '>' },
            right: {
              tokens: [{ column: 15, kind: TokenKind.Int, line: 1, literal: '4' }],
              value: 4
            },
            tokens: [
              { column: 11, kind: TokenKind.Int, line: 1, literal: '3' },
              { column: 13, kind: TokenKind.GreatThan, line: 1, literal: '>' },
              { column: 15, kind: TokenKind.Int, line: 1, literal: '4' }
            ]
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 4, kind: TokenKind.LessThan, line: 1, literal: '<' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '4' },
            { column: 8, kind: TokenKind.NotEqual, line: 1, literal: '!=' },
            { column: 11, kind: TokenKind.Int, line: 1, literal: '3' },
            { column: 13, kind: TokenKind.GreatThan, line: 1, literal: '>' },
            { column: 15, kind: TokenKind.Int, line: 1, literal: '4' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 4, kind: TokenKind.LessThan, line: 1, literal: '<' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '4' },
          { column: 8, kind: TokenKind.NotEqual, line: 1, literal: '!=' },
          { column: 11, kind: TokenKind.Int, line: 1, literal: '3' },
          { column: 13, kind: TokenKind.GreatThan, line: 1, literal: '>' },
          { column: 15, kind: TokenKind.Int, line: 1, literal: '4' }
        ]
      }]
    },
    '3 + 4 * 5 == 3 * 1 + 4 * 5;': {
      statements: [{
        expression: {
          left: {
            left: {
              tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '3' }],
              value: 3
            },
            operator: { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
            right: {
              left: {
                tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '4' }],
                value: 4
              },
              operator: { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
              right: {
                tokens: [{ column: 10, kind: TokenKind.Int, line: 1, literal: '5' }],
                value: 5
              },
              tokens: [
                { column: 6, kind: TokenKind.Int, line: 1, literal: '4' },
                { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
                { column: 10, kind: TokenKind.Int, line: 1, literal: '5' }
              ]
            },
            tokens: [
              { column: 2, kind: TokenKind.Int, line: 1, literal: '3' },
              { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
              { column: 6, kind: TokenKind.Int, line: 1, literal: '4' },
              { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
              { column: 10, kind: TokenKind.Int, line: 1, literal: '5' }
            ]
          },
          operator: { column: 12, kind: TokenKind.Equal, line: 1, literal: '==' },
          right: {
            left: {
              left: {
                tokens: [{ column: 15, kind: TokenKind.Int, line: 1, literal: '3' }],
                value: 3
              },
              operator: { column: 17, kind: TokenKind.Asterisk, line: 1, literal: '*' },
              right: {
                tokens: [{ column: 19, kind: TokenKind.Int, line: 1, literal: '1' }],
                value: 1
              },
              tokens: [
                { column: 15, kind: TokenKind.Int, line: 1, literal: '3' },
                { column: 17, kind: TokenKind.Asterisk, line: 1, literal: '*' },
                { column: 19, kind: TokenKind.Int, line: 1, literal: '1' }
              ]
            },
            operator: { column: 21, kind: TokenKind.Plus, line: 1, literal: '+' },
            right: {
              left: {
                tokens: [{ column: 23, kind: TokenKind.Int, line: 1, literal: '4' }],
                value: 4
              },
              operator: { column: 25, kind: TokenKind.Asterisk, line: 1, literal: '*' },
              right: {
                tokens: [{ column: 27, kind: TokenKind.Int, line: 1, literal: '5' }],
                value: 5
              },
              tokens: [
                { column: 23, kind: TokenKind.Int, line: 1, literal: '4' },
                { column: 25, kind: TokenKind.Asterisk, line: 1, literal: '*' },
                { column: 27, kind: TokenKind.Int, line: 1, literal: '5' }
              ]
            },
            tokens: [
              { column: 15, kind: TokenKind.Int, line: 1, literal: '3' },
              { column: 17, kind: TokenKind.Asterisk, line: 1, literal: '*' },
              { column: 19, kind: TokenKind.Int, line: 1, literal: '1' },
              { column: 21, kind: TokenKind.Plus, line: 1, literal: '+' },
              { column: 23, kind: TokenKind.Int, line: 1, literal: '4' },
              { column: 25, kind: TokenKind.Asterisk, line: 1, literal: '*' },
              { column: 27, kind: TokenKind.Int, line: 1, literal: '5' }
            ]
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '3' },
            { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '4' },
            { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            { column: 10, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 12, kind: TokenKind.Equal, line: 1, literal: '==' },
            { column: 15, kind: TokenKind.Int, line: 1, literal: '3' },
            { column: 17, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            { column: 19, kind: TokenKind.Int, line: 1, literal: '1' },
            { column: 21, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 23, kind: TokenKind.Int, line: 1, literal: '4' },
            { column: 25, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            { column: 27, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '3' },
          { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '4' },
          { column: 8, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          { column: 10, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 12, kind: TokenKind.Equal, line: 1, literal: '==' },
          { column: 15, kind: TokenKind.Int, line: 1, literal: '3' },
          { column: 17, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          { column: 19, kind: TokenKind.Int, line: 1, literal: '1' },
          { column: 21, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 23, kind: TokenKind.Int, line: 1, literal: '4' },
          { column: 25, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          { column: 27, kind: TokenKind.Int, line: 1, literal: '5' }
        ]
      }]
    },
    'true;': {
      statements: [
        {
          expression: {
            tokens: [{ column: 2, kind: TokenKind.True, line: 1, literal: 'true' }],
            value: true
          },
          kind: StatementKind.Expression,
          tokens: [{ column: 2, kind: TokenKind.True, line: 1, literal: 'true' }]
        }
      ]
    },
    'false;': {
      statements: [
        {
          expression: {
            tokens: [{ column: 2, kind: TokenKind.False, line: 1, literal: 'false' }],
            value: false
          },
          kind: StatementKind.Expression,
          tokens: [{ column: 2, kind: TokenKind.False, line: 1, literal: 'false' }]
        }
      ]
    },
    '3 > 5 == false;': {
      statements: [{
        expression: {
          left: {
            left: {
              tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '3' }],
              value: 3
            },
            operator: { column: 4, kind: TokenKind.GreatThan, line: 1, literal: '>' },
            right: {
              tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '5' }],
              value: 5
            },
            tokens: [
              { column: 2, kind: TokenKind.Int, line: 1, literal: '3' },
              { column: 4, kind: TokenKind.GreatThan, line: 1, literal: '>' },
              { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
            ]
          },
          operator: { column: 8, kind: TokenKind.Equal, line: 1, literal: '==' },
          right: {
            tokens: [{ column: 11, kind: TokenKind.False, line: 1, literal: 'false' }],
            value: false
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '3' },
            { column: 4, kind: TokenKind.GreatThan, line: 1, literal: '>' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 8, kind: TokenKind.Equal, line: 1, literal: '==' },
            { column: 11, kind: TokenKind.False, line: 1, literal: 'false' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '3' },
          { column: 4, kind: TokenKind.GreatThan, line: 1, literal: '>' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 8, kind: TokenKind.Equal, line: 1, literal: '==' },
          { column: 11, kind: TokenKind.False, line: 1, literal: 'false' }
        ]
      }]
    },
    '3 < 5 == true;': {
      statements: [{
        expression: {
          left: {
            left: {
              tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '3' }],
              value: 3
            },
            operator: { column: 4, kind: TokenKind.LessThan, line: 1, literal: '<' },
            right: {
              tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '5' }],
              value: 5
            },
            tokens: [
              { column: 2, kind: TokenKind.Int, line: 1, literal: '3' },
              { column: 4, kind: TokenKind.LessThan, line: 1, literal: '<' },
              { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
            ]
          },
          operator: { column: 8, kind: TokenKind.Equal, line: 1, literal: '==' },
          right: {
            tokens: [{ column: 11, kind: TokenKind.True, line: 1, literal: 'true' }],
            value: true
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '3' },
            { column: 4, kind: TokenKind.LessThan, line: 1, literal: '<' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 8, kind: TokenKind.Equal, line: 1, literal: '==' },
            { column: 11, kind: TokenKind.True, line: 1, literal: 'true' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '3' },
          { column: 4, kind: TokenKind.LessThan, line: 1, literal: '<' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 8, kind: TokenKind.Equal, line: 1, literal: '==' },
          { column: 11, kind: TokenKind.True, line: 1, literal: 'true' }
        ]
      }]
    }
  }
};
