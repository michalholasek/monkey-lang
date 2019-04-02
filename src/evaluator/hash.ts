import { HashExpression } from '../parser/ast/types';
import { Environment, HashLiteral, Object, ObjectKind } from './types';

import { createKey, createObject } from './helpers';
import { evaluateExpression } from './index';

export function evaluateHashExpresion(expression: HashExpression, env: Environment): Object {
  let hash: HashLiteral = { keys: {}, values: {} };
  let key;
  let value;

  if (!expression.pairs) return createObject(ObjectKind.Null);

  for (let pair of expression.pairs) {
    key = evaluateExpression(pair.key, env);
    value = evaluateExpression(pair.value, env);

    hash.keys[createKey(key)] = key;
    hash.values[createKey(key)] = value;
  }

  return createObject(ObjectKind.Hash, hash);
}
