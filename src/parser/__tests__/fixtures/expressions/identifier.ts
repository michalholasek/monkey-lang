import { TokenKind } from '../../../../lexer/types';
import { NodeKind } from '../../../ast/types';

export const Identifier = {
  statements: [
    {
      expression: {
        tokens: [{ column: 2, kind: TokenKind.Identifier, line: 1, literal: 'foobar' }],
        value: 'foobar'
      },
      kind: NodeKind.Expression,
      tokens: [{ column: 2, kind: TokenKind.Identifier, line: 1, literal: 'foobar' }]
    }
  ]
};
