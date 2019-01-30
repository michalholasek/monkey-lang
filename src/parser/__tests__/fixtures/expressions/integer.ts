import { TokenKind } from '../../../../lexer/types';
import { NodeKind } from '../../../ast/types';

export const Integer = {
  statements: [
    {
      expression: {
        tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }],
        value: 5
      },
      kind: NodeKind.Expression,
      tokens: [{ column: 2, kind: TokenKind.Int, line: 1, literal: '5' }]
    }
  ]
};
