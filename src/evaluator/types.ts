import { ExpressionValue } from '../parser/ast/types';

export enum ObjectKind {
  Boolean = 'BOOLEAN',
  Error = 'ERROR',
  Integer = 'INTEGER',
  Let = 'LET',
  Null = 'NULL',
  Return = 'RETURN_VALUE'
}

export interface Object {
  kind: ObjectKind;
  value?: ExpressionValue;
}

export interface Environment {
  get: (key: string) => Object;
  set: (key: string, object: Object) => void;
}
