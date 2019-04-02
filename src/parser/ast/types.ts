import { AssertionError } from '../../common/types';
import { Token } from '../../lexer/types';

export interface ArrayExpression extends Expression {
  elements: Expression[];
}

export interface BlockStatement {
  statements: Statement[];
  tokens: Token[];
}

export interface CallExpression extends Expression {
  arguments?: Expression[];
  identifier?: Token;
}

export interface Expression {
  kind?: ExpressionKind;
  tokens: Token[];
  value?: ExpressionValue;
}

export enum ExpressionKind {
  Illegal,
  Integer,
  Boolean,
  Prefix,
  Infix,
  IfElse,
  Identifier,
  Function,
  Call,
  String,
  Array,
  Index,
  Hash
}

export type ExpressionValue = number | string | boolean | ArrayExpression | FunctionExpression;

export interface FunctionExpression extends Expression {
  body: BlockStatement;
  parameters: Token[];
}

export interface HashExpression extends Expression {
  pairs?: KeyValuePair[];
}

export interface IfElseExpression extends Expression {
  alternative?: BlockStatement;
  consequence?: BlockStatement;
  condition?: Expression;
}

export interface IndexExpression extends Expression {
  left?: Expression;
  index?: Expression;
}

export interface InfixExpression extends Expression {
  left?: Expression;
  operator?: Token;
  right?: Expression;
}

export type Node = Program | Statement;

// Let and Return ordering matches TokenKind
export enum NodeKind {
  Let = 17,
  Return = 22,
  Expression = 100,
  Program = 101
}

export interface Program {
  errors: AssertionError[];
  kind: NodeKind;
  statements: Statement[];
}

export interface PrefixExpression extends Expression {
  left?: InfixExpression;
  right?: Expression;
}

export interface Statement {
  kind?: NodeKind;
  name?: Token;
  tokens?: Token[];
  expression?: Expression;
}

interface KeyValuePair {
  key: Expression;
  value: Expression;
}
