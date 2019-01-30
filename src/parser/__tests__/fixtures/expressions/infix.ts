import { TokenKind } from '../../../../lexer/types';
import { NodeKind } from '../../../ast/types';

export const Infix = {
  '5 + 5;': {
    statements: [
      {
        expression: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          operator: { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
          right: {
            tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 4, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
        ]
      }
    ]
  },
  '5 - 5;': {
    statements: [
      {
        expression: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          operator: { column: 4, kind: TokenKind.Minus, line: 1, literal: '-' },
          right: {
            tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 4, kind: TokenKind.Minus, line: 1, literal: '-' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 4, kind: TokenKind.Minus, line: 1, literal: '-' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
        ]
      }
    ]
  },
  '5 * 5;': {
    statements: [
      {
        expression: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          operator: { column: 4, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          right: {
            tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 4, kind: TokenKind.Asterisk, line: 1, literal: '*' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 4, kind: TokenKind.Asterisk, line: 1, literal: '*' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
        ]
      }
    ]
  },
  '5 / 5;': {
    statements: [
      {
        expression: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          operator: { column: 4, kind: TokenKind.Slash, line: 1, literal: '/' },
          right: {
            tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 4, kind: TokenKind.Slash, line: 1, literal: '/' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 4, kind: TokenKind.Slash, line: 1, literal: '/' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
        ]
      }
    ]
  },
  '5 > 5;': {
    statements: [
      {
        expression: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          operator: { column: 4, kind: TokenKind.GreaterThan, line: 1, literal: '>' },
          right: {
            tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 4, kind: TokenKind.GreaterThan, line: 1, literal: '>' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 4, kind: TokenKind.GreaterThan, line: 1, literal: '>' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
        ]
      }
    ]
  },
  '5 < 5;': {
    statements: [
      {
        expression: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          operator: { column: 4, kind: TokenKind.LessThan, line: 1, literal: '<' },
          right: {
            tokens: [{ column: 6, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 4, kind: TokenKind.LessThan, line: 1, literal: '<' },
            { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 4, kind: TokenKind.LessThan, line: 1, literal: '<' },
          { column: 6, kind: TokenKind.Int, line: 1, literal: '5' }
        ]
      }
    ]
  },
  '5 == 5;': {
    statements: [
      {
        expression: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          operator: { column: 4, kind: TokenKind.Equal, line: 1, literal: '==' },
          right: {
            tokens: [{ column: 7, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 4, kind: TokenKind.Equal, line: 1, literal: '==' },
            { column: 7, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 4, kind: TokenKind.Equal, line: 1, literal: '==' },
          { column: 7, kind: TokenKind.Int, line: 1, literal: '5' }
        ]
      }
    ]
  },
  '5 != 5;': {
    statements: [
      {
        expression: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          operator: { column: 4, kind: TokenKind.NotEqual, line: 1, literal: '!=' },
          right: {
            tokens: [{ column: 7, kind: TokenKind.Int, line: 1, literal: '5' }],
            value: 5
          },
          tokens: [
            { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
            { column: 4, kind: TokenKind.NotEqual, line: 1, literal: '!=' },
            { column: 7, kind: TokenKind.Int, line: 1, literal: '5' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Int, line: 1, literal: '5' },
          { column: 4, kind: TokenKind.NotEqual, line: 1, literal: '!=' },
          { column: 7, kind: TokenKind.Int, line: 1, literal: '5' }
        ]
      }
    ]
  },
  'true == true;': {
    statements: [
      {
        expression: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.True, line: 1, literal: 'true' }],
            value: true
          },
          operator: { column: 7, kind: TokenKind.Equal, line: 1, literal: '==' },
          right: {
            tokens: [{ column: 10, kind: TokenKind.True, line: 1, literal: 'true' }],
            value: true
          },
          tokens: [
            { column: 2, kind: TokenKind.True, line: 1, literal: 'true' },
            { column: 7, kind: TokenKind.Equal, line: 1, literal: '==' },
            { column: 10, kind: TokenKind.True, line: 1, literal: 'true' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.True, line: 1, literal: 'true' },
          { column: 7, kind: TokenKind.Equal, line: 1, literal: '==' },
          { column: 10, kind: TokenKind.True, line: 1, literal: 'true' }
        ]
      }
    ]
  },
  'true != false;': {
    statements: [
      {
        expression: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.True, line: 1, literal: 'true' }],
            value: true
          },
          operator: { column: 7, kind: TokenKind.NotEqual, line: 1, literal: '!=' },
          right: {
            tokens: [{ column: 10, kind: TokenKind.False, line: 1, literal: 'false' }],
            value: false
          },
          tokens: [
            { column: 2, kind: TokenKind.True, line: 1, literal: 'true' },
            { column: 7, kind: TokenKind.NotEqual, line: 1, literal: '!=' },
            { column: 10, kind: TokenKind.False, line: 1, literal: 'false' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.True, line: 1, literal: 'true' },
          { column: 7, kind: TokenKind.NotEqual, line: 1, literal: '!=' },
          { column: 10, kind: TokenKind.False, line: 1, literal: 'false' }
        ]
      }
    ]
  },
  'false == false;': {
    statements: [
      {
        expression: {
          left: {
            tokens: [{ column: 2, kind: TokenKind.False, line: 1, literal: 'false' }],
            value: false
          },
          operator: { column: 8, kind: TokenKind.Equal, line: 1, literal: '==' },
          right: {
            tokens: [{ column: 11, kind: TokenKind.False, line: 1, literal: 'false' }],
            value: false
          },
          tokens: [
            { column: 2, kind: TokenKind.False, line: 1, literal: 'false' },
            { column: 8, kind: TokenKind.Equal, line: 1, literal: '==' },
            { column: 11, kind: TokenKind.False, line: 1, literal: 'false' }
          ]
        },
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.False, line: 1, literal: 'false' },
          { column: 8, kind: TokenKind.Equal, line: 1, literal: '==' },
          { column: 11, kind: TokenKind.False, line: 1, literal: 'false' }
        ]
      }
    ]
  }
};
