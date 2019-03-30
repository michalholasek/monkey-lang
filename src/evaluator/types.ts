import { Token } from '../lexer/types';
import { BlockStatement, Expression, ExpressionValue } from '../parser/ast/types';

export enum ObjectKind {
  Array = 'ARRAY',
  Boolean = 'BOOLEAN',
  BuiltIn = 'BUILT_IN',
  Error = 'ERROR',
  Function = 'FUNCTION',
  Integer = 'INTEGER',
  Let = 'LET',
  Null = 'NULL',
  Return = 'RETURN_VALUE',
  String = 'STRING'
}

export interface Object {
  body?: BlockStatement;
  env?: Environment;
  fn?: (expression: Expression, args: Object[] | undefined) => Object;
  kind: ObjectKind;
  parameters?: Token[];
  value?: ExpressionValue;
}

export interface Environment {
  get: (key: string) => Object;
  set: (key: string, object: Object) => void;
}
