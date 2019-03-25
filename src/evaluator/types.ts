import { BlockStatement, Expression, ExpressionValue, Identifier } from '../parser/ast/types';

export enum ObjectKind {
  Boolean = 'BOOLEAN',
  Error = 'ERROR',
  Function = 'FUNCTION',
  Integer = 'INTEGER',
  Let = 'LET',
  Null = 'NULL',
  Return = 'RETURN_VALUE',
  String = 'STRING',
  BuiltIn = 'BUILT_IN'
}

export interface Object {
  body?: BlockStatement;
  env?: Environment;
  fn?: (expression: Expression, args: Object[] | undefined) => Object;
  kind: ObjectKind;
  parameters?: Identifier[];
  value?: ExpressionValue;
}

export interface Environment {
  get: (key: string) => Object;
  set: (key: string, object: Object) => void;
}
