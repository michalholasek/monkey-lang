import { TokenKind } from '../../../../lexer/types';
import { NodeKind } from '../../../ast/types';

export const String = {
  '"foo bar"': {
    statements: [
      {
        expression: {
          tokens: [{ column: 2, kind: TokenKind.String, line: 1, literal: 'foo bar' }],
          value: 'foo bar'
        },
        kind: NodeKind.Expression,
        tokens: [{ column: 2, kind: TokenKind.String, line: 1, literal: 'foo bar' }]
      }
    ]
  }
};
