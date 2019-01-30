import { ExpressionValue } from '../parser/ast/types';
import { Object, ObjectKind } from './types';

export function createObject(kind: ObjectKind, value: ExpressionValue = 0): Object {
  switch (kind) {
    case ObjectKind.Integer:
    case ObjectKind.Boolean:
      return { kind, value };
    default:
      return { kind: ObjectKind.Null };
  }
}
