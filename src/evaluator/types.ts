import { ExpressionValue } from '../parser/ast/types';

export enum ObjectKind {
  Boolean = 'BOOLEAN',
  Integer = 'INTEGER',
  Null = 'NULL'
}

export interface Object {
  kind: ObjectKind;
  value?: ExpressionValue;
}
