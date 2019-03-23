import { BlockStatement, ExpressionValue, Identifier } from '../parser/ast/types';

export enum ObjectKind {
  Boolean = 'BOOLEAN',
  Error = 'ERROR',
  Function = 'FUNCTION',
  Integer = 'INTEGER',
  Let = 'LET',
  Null = 'NULL',
  Return = 'RETURN_VALUE'
}

export interface Object {
  body?: BlockStatement;
  env?: Environment;
  kind: ObjectKind;
  parameters?: Identifier[];
  value?: ExpressionValue;
}

export interface Environment {
  get: (key: string) => Object;
  set: (key: string, object: Object) => void;
}
