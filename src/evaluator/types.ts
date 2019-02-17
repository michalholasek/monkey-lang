import { ExpressionValue } from '../parser/ast/types';

export enum ObjectKind {
  Boolean = 'BOOLEAN',
  Error = 'ERROR',
  Integer = 'INTEGER',
  Null = 'NULL',
  Return = 'RETURN_VALUE'
}

export interface Object {
  kind: ObjectKind;
  value?: ExpressionValue;
}
