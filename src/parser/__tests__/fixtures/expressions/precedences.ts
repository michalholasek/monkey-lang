import { TokenKind } from '../../../../lexer/types';
import { StatementKind } from '../../../ast/types';

export const OperatorPrecedence = {
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
  },
  '1 + (2 + 3) + 4;': {
    statements: [{
      expression: {
        left: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '1' }],
            value: 1
          },
          operator: { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
          right: {
            left: {
              tokens: [{ column: 7, kind: TokenKind.Int, line: 1, literal: '2' }],
              value: 2
            },
            operator: { column: 9, kind: TokenKind.Plus, line: 1, literal: '+' },
            right: {
              tokens: [{ column: 11, kind: TokenKind.Int, line: 1, literal: '3' }],
              value: 3
            },
            tokens: [
              { column: 7, kind: TokenKind.Int, line: 1, literal: '2' },
              { column: 9, kind: TokenKind.Plus, line: 1, literal: '+' },
              { column: 11, kind: TokenKind.Int, line: 1, literal: '3' }
            ]
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '1' },
            { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 7, kind: TokenKind.Int, line: 1, literal: '2' },
            { column: 9, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 11, kind: TokenKind.Int, line: 1, literal: '3' }
          ]
        },
        operator: { column: 14, kind: TokenKind.Plus, line: 1, literal: '+' },
        right: {
          tokens: [{ column: 16, kind: TokenKind.Int, line: 1, literal: '4' }],
          value: 4
        },
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '1' },
          { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 7, kind: TokenKind.Int, line: 1, literal: '2' },
          { column: 9, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 11, kind: TokenKind.Int, line: 1, literal: '3' },
          { column: 14, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 16, kind: TokenKind.Int, line: 1, literal: '4' }
        ]
      },
      kind: StatementKind.Expression,
      tokens: [
        { column: 2, kind: TokenKind.Int, line: 1, literal: '1' },
        { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
        { column: 6, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
        { column: 7, kind: TokenKind.Int, line: 1, literal: '2' },
        { column: 9, kind: TokenKind.Plus, line: 1, literal: '+' },
        { column: 11, kind: TokenKind.Int, line: 1, literal: '3' },
        { column: 12, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
        { column: 14, kind: TokenKind.Plus, line: 1, literal: '+' },
        { column: 16, kind: TokenKind.Int, line: 1, literal: '4' }
      ]
    }]
  },
  '(5 + 5) * 2;': {
    statements: [{
      expression: {
        left: {
          left: {
            tokens: [{ column: 3, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          operator: { column: 5, kind: TokenKind.Plus, line: 1, literal: '+' },
          right: {
            tokens: [{ column: 7, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 3, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 5, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 7, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        operator: { column: 10, kind: TokenKind.Asterisk, line: 1, literal: '*' },
        right: {
          tokens: [{ column: 12, kind: TokenKind.Int, line: 1, literal: '2' }],
          value: 2
        },
        tokens: [
          { column: 3, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 5, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 7, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 10, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          { column: 12, kind: TokenKind.Int, line: 1, literal: '2' }
        ]
      },
      kind: StatementKind.Expression,
      tokens: [
        { column: 2, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
        { column: 3, kind: TokenKind.Int, line: 1, literal: '5' },
        { column: 5, kind: TokenKind.Plus, line: 1, literal: '+' },
        { column: 7, kind: TokenKind.Int, line: 1, literal: '5' },
        { column: 8, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
        { column: 10, kind: TokenKind.Asterisk, line: 1, literal: '*' },
        { column: 12, kind: TokenKind.Int, line: 1, literal: '2' }
      ]
    }]
  },
  '2 / (5 + 5);': {
    statements: [{
      expression: {
        left: {
          tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '2' }],
          value: 2
        },
        operator: { column: 4, kind: TokenKind.Slash, line: 1, literal: '/' },
        right: {
          left: {
            tokens: [{ column: 7, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          operator: { column: 9, kind: TokenKind.Plus, line: 1, literal: '+' },
          right: {
            tokens: [{ column: 11, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 7, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 9, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 11, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '2' },
          { column: 4, kind: TokenKind.Slash, line: 1, literal: '/' },
          { column: 7, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 9, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 11, kind: TokenKind.Int, line: 1, literal: '5' }
        ]
      },
      kind: StatementKind.Expression,
      tokens: [
        { column: 2, kind: TokenKind.Int, line: 1, literal: '2' },
        { column: 4, kind: TokenKind.Slash, line: 1, literal: '/' },
        { column: 6, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
        { column: 7, kind: TokenKind.Int, line: 1, literal: '5' },
        { column: 9, kind: TokenKind.Plus, line: 1, literal: '+' },
        { column: 11, kind: TokenKind.Int, line: 1, literal: '5' },
        { column: 12, kind: TokenKind.RightParenthesis, line: 1, literal: ')' }
      ]
    }]
  },
  '-(5 + 5);': {
    statements: [
      {
        expression: {
          left: {
            operator: { column: 2, kind: TokenKind.Minus, line: 1, literal: '-' },
            tokens: [{ column: 2, kind: TokenKind.Minus, line: 1, literal: '-' }]
          },
          right: {
            left: {
              tokens: [{ column: 4, kind: TokenKind.Int, line: 1, literal: '5' }],
              value: 5
            },
            operator: { column: 6, kind: TokenKind.Plus, line: 1, literal: '+' },
            right: {
              tokens: [{ column: 8, kind: TokenKind.Int, line: 1, literal: '5' }],
              value: 5
            },
            tokens: [
              { column: 4, kind: TokenKind.Int, line: 1, literal: '5' },
              { column: 6, kind: TokenKind.Plus, line: 1, literal: '+' },
              { column: 8, kind: TokenKind.Int, line: 1, literal: '5' }
            ]
          },
          tokens: [
            { column: 2, kind: TokenKind.Minus, line: 1, literal: '-' },
            { column: 4, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 6, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 8, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Minus, line: 1, literal: '-' },
          { column: 3, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
          { column: 4, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 6, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 8, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 9, kind: TokenKind.RightParenthesis, line: 1, literal: ')' }
        ]
      }
    ]
  },
  '!(true == true);': {
    statements: [
      {
        expression: {
          left: {
            operator: { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
            tokens: [{ column: 2, kind: TokenKind.Bang, line: 1, literal: '!' }]
          },
          right: {
            left: {
              tokens: [{ column: 4, kind: TokenKind.True, line: 1, literal: 'true' }],
              value: true
            },
            operator: { column: 9, kind: TokenKind.Equal, line: 1, literal: '==' },
            right: {
              tokens: [{ column: 12, kind: TokenKind.True, line: 1, literal: 'true' }],
              value: true
            },
            tokens: [
              { column: 4, kind: TokenKind.True, line: 1, literal: 'true' },
              { column: 9, kind: TokenKind.Equal, line: 1, literal: '==' },
              { column: 12, kind: TokenKind.True, line: 1, literal: 'true' }
            ]
          },
          tokens: [
            { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
            { column: 4, kind: TokenKind.True, line: 1, literal: 'true' },
            { column: 9, kind: TokenKind.Equal, line: 1, literal: '==' },
            { column: 12, kind: TokenKind.True, line: 1, literal: 'true' }
          ]
        },
        kind: StatementKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
          { column: 3, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
          { column: 4, kind: TokenKind.True, line: 1, literal: 'true' },
          { column: 9, kind: TokenKind.Equal, line: 1, literal: '==' },
          { column: 12, kind: TokenKind.True, line: 1, literal: 'true' },
          { column: 16, kind: TokenKind.RightParenthesis, line: 1, literal: ')' }
        ]
      }
    ]
  }
};
