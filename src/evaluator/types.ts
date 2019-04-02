import { AssertionError } from '../common/types';
import { Token } from '../lexer/types';
import { ArrayExpression, BlockStatement, Expression, FunctionExpression } from '../parser/ast/types';

export interface Environment {
  get: (key: string) => Object;
  set: (key: string, object: Object) => void;
}

export interface HashLiteral {
  keys: { [key: string]: Object };
  values: { [key: string]: Object };
}

export interface Object {
  body?: BlockStatement;
  env?: Environment;
  fn?: (expression: Expression, args: Object[] | undefined) => Object;
  kind: ObjectKind;
  parameters?: Token[];
  value?: ObjectValue;
}

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
  String = 'STRING',
  Hash = 'HASH',
  Puts = 'PUTS'
}

export type ObjectValue = number
  | string
  | boolean
  | Object
  | Object[]
  | FunctionExpression
  | ArrayExpression
  | HashLiteral
  | AssertionError;
