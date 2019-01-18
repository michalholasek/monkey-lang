import { TokenKind } from '../../../../lexer/types';
import { StatementKind } from '../../../ast/types';

export const Identifier = {
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
};
