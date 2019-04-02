import { AssertionErrorKind } from '../common/types';
import { TokenKind } from '../lexer/types';
import { IndexExpression } from '../parser/ast/types';
import { Environment, HashLiteral, Object, ObjectKind } from './types';

import { createCustomAssertionError } from '../common';
import { createKey, createObject } from './helpers';
import { evaluateExpression } from './index';

export function evaluateIndexExpresion(expression: IndexExpression, env: Environment): Object {
  let nullObject = createObject(ObjectKind.Null);

  if (!expression.left || !expression.index) return nullObject;

  let left = evaluateExpression(expression.left, env);
  let index = evaluateExpression(expression.index, env);

  switch (left.kind) {
    case ObjectKind.Hash:
      return evaluateHashIndexExpresion(expression, left, index);
    default:
      return evaluateArrayIndexExpresion(left, index);
  }
}

function evaluateArrayIndexExpresion(array: Object, index: Object): Object {
  let arrayValue = array.value as Object[];
  let indexValue = index.value as number;

  if (!arrayValue.length || (!index && index !== 0) || indexValue < 0 || indexValue > arrayValue.length - 1) {
    return createObject(ObjectKind.Null);
  }

  return arrayValue[indexValue];
}

function evaluateHashIndexExpresion(expression: IndexExpression, hash: Object, index: Object): Object {
  let nullObject = createObject(ObjectKind.Null);
  let pair = hash.value as HashLiteral;

  if (!expression.index) return nullObject;

  if (index.kind !== ObjectKind.Integer && index.kind !== ObjectKind.String && index.kind !== ObjectKind.Boolean) {
    let indexToken = expression.index.tokens[0];
    return createObject(
      ObjectKind.Error,
      createCustomAssertionError(
        AssertionErrorKind.InvalidIndex,
        `got ${TokenKind[indexToken.kind]}`,
        indexToken.column,
        indexToken.line
      ).message
    );
  }

  return pair.values[createKey(index)] || nullObject;
}
