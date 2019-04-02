import { ArrayExpression } from '../parser/ast/types';
import { Environment, Object, ObjectKind } from './types';

import { createObject } from './helpers';
import { evaluateExpressionList } from './list';

export function evaluateArrayExpresion(array: ArrayExpression, env: Environment): Object {
  let arrayLiteral = array.value as ArrayExpression;
  return createObject(ObjectKind.Array, evaluateExpressionList(arrayLiteral.elements, env));
}
