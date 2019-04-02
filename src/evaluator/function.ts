import { Expression } from '../parser/ast/types';
import { Environment, Object, ObjectKind } from './types';

import { createObject } from './helpers';

export function evaluateFunctionExpression(expression: Expression, env: Environment): Object {
  let fn = createObject(ObjectKind.Function, expression.value);
  fn.env = env;

  return fn;
}
