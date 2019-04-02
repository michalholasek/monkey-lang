import { AssertionErrorKind } from '../common/types';
import { Expression } from '../parser/ast/types';
import { Environment, Object, ObjectKind } from './types';

import { createAssertionError } from '../common';
import { BuiltIns } from './builtins';
import { createObject } from './helpers';

export function evaluateIdentifierExpression(expression: Expression, env: Environment): Object {
  if (!expression.value) return createObject(ObjectKind.Null);

  let identifierValue = env.get(expression.value as string);
  if (identifierValue) return identifierValue;

  let builtIn = BuiltIns[expression.value as string];
  if (builtIn) return builtIn;

  return createObject(
    ObjectKind.Error,
    createAssertionError(AssertionErrorKind.InvalidIdentifier, expression.tokens[0]).message
  );
}
