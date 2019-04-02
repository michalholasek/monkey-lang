import { Environment, Object, ObjectKind, ObjectValue } from './types';

import { createHash } from 'crypto';

export function createEnvironment(): Environment {
  let store: { [key: string]: Object } = {};

  return {
    get(key) {
      return store[key];
    },
    set(key, object) {
      store[key] = object;
    }
  };
}

export function createEnclosedEnvironment(outer: Environment): Environment {
  let env = createEnvironment();

  return {
    get(key) {
      let value = env.get(key);
      return value ? value : outer.get(key);
    },
    set(key, object) {
      env.set(key, object);
    }
  };
}

export function createKey(key: Object): string {
  let seed: string | Buffer;

  switch (key.kind) {
    case ObjectKind.Integer:
      seed = Buffer.from([key.value as number]);
      break;
    case ObjectKind.Boolean:
      seed = key.value === true ? 'true': 'false';
      break;
    default:
      seed = key.value as string;
  }

  return createHash('sha256').update(seed).digest('hex');
}

export function createObject(kind: ObjectKind, value: ObjectValue = 0): Object {
  switch (kind) {
    case ObjectKind.Integer:
    case ObjectKind.Boolean:
    case ObjectKind.Let:
    case ObjectKind.Return:
    case ObjectKind.Error:
    case ObjectKind.Function:
    case ObjectKind.String:
    case ObjectKind.Array:
    case ObjectKind.Hash:
    case ObjectKind.Puts:
      return { kind, value };
    default:
      return { kind: ObjectKind.Null };
  }
}
