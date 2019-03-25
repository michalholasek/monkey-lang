import { AssertionErrorKind } from '../common/types';
import { TokenKind } from '../lexer/types';
import { Expression } from '../parser/ast/types';
import { Object, ObjectKind } from './types';

import { createCustomAssertionError } from '../common';
import { createObject } from './helpers';

export const BuiltIns: { [key: string]: Object } = {
  len: {
    kind: ObjectKind.BuiltIn,
    fn(expression: Expression, args: Object[] | undefined) {
      let argumentToken;

      if (!args || !args.length || args.length > 1) {
        argumentToken = expression.tokens[expression.tokens.length - 1];
        return createObject(
          ObjectKind.Error,
          createCustomAssertionError(
            AssertionErrorKind.InvalidArgument,
            'unexpected number of arguments',
            argumentToken.column,
            argumentToken.line
          ).message
        );
      }

      if (typeof args[0].value !== 'string') {
        argumentToken = expression.tokens[2];
        return createObject(
          ObjectKind.Error,
          createCustomAssertionError(
            AssertionErrorKind.InvalidArgument,
            `expected String, got ${TokenKind[argumentToken.kind]} instead`,
            argumentToken.column,
            argumentToken.line
          ).message
        );
      }

      return createObject(ObjectKind.Integer, args[0].value.length);
    }
  }
};
