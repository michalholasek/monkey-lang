import { TokenKind } from '../../../../lexer/types';
import { NodeKind } from '../../../ast/types';

export const Prefix = {
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
        kind: NodeKind.Expression,
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
        kind: NodeKind.Expression,
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
        kind: NodeKind.Expression,
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
        kind: NodeKind.Expression,
        tokens: [
          { column: 2, kind: TokenKind.Bang, line: 1, literal: '!' },
          { column: 3, kind: TokenKind.False, line: 1, literal: 'false' }
        ]
      }
    ]
  }
};
