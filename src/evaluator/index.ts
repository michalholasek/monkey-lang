import {
  ArrayExpression,
  Expression,
  ExpressionKind,
  Node,
  NodeKind,
  Program,
  Statement
} from '../parser/ast/types';
import { Environment, Object, ObjectKind } from './types';

import { evaluateArrayExpresion } from './array';
import { evaluateCallExpression } from './call';
import { evaluateFunctionExpression } from './function';
import { evaluateHashExpresion } from './hash';
import { evaluateIdentifierExpression } from './identifier';
import { evaluateIfElseExpression } from './if';
import { evaluateIndexExpresion } from './indexes';
import { evaluateInfixExpression } from './infix';
import { evaluatePrefixExpression } from './prefix';

import { createObject } from './helpers';

export function evaluate(node: Node, env: Environment): Object {
  let statement;

  switch (node.kind) {
    case NodeKind.Program:
      let program = node as Program;
      return evaluateStatements(program.statements, env);
    case NodeKind.Let:
      statement = node as Statement;
      return evaluateLetStatement(statement, env);
    case NodeKind.Return:
      statement = node as Statement;
      if (statement.expression) return evaluateReturnStatement(statement.expression, env);
      break;
    case NodeKind.Expression:
      statement = node as Statement;
      if (statement.expression) return evaluateExpression(statement.expression, env);
  }

  return createObject(ObjectKind.Null);
}

export function evaluateExpression(expression: Expression, env: Environment): Object {
  let objectKind;

  switch (expression.kind) {
    case ExpressionKind.Integer:
      objectKind = ObjectKind.Integer;
      break;
    case ExpressionKind.Boolean:
      objectKind = ObjectKind.Boolean;
      break;
    case ExpressionKind.String:
      objectKind = ObjectKind.String;
      break;
    case ExpressionKind.Function:
      return evaluateFunctionExpression(expression, env);
    case ExpressionKind.Identifier:
      return evaluateIdentifierExpression(expression, env);
    case ExpressionKind.Prefix:
      return evaluatePrefixExpression(expression, env);
    case ExpressionKind.Infix:
      return evaluateInfixExpression(expression, env);
    case ExpressionKind.IfElse:
      return evaluateIfElseExpression(expression, env);
    case ExpressionKind.Call:
      return evaluateCallExpression(expression, env);
    case ExpressionKind.Array:
      return evaluateArrayExpresion(expression as ArrayExpression, env);
    case ExpressionKind.Index:
      return evaluateIndexExpresion(expression, env);
    case ExpressionKind.Hash:
      return evaluateHashExpresion(expression, env);
    default:
      objectKind = ObjectKind.Null;
  }

  return createObject(objectKind, expression.value);
}

export function evaluateLetStatement(statement: Statement, env: Environment): Object {
  let nullObject = createObject(ObjectKind.Null);

  if (!statement.expression || !statement.name) return nullObject;

  let expressionValue = evaluateExpression(statement.expression, env);
  if (expressionValue.kind === ObjectKind.Error) return expressionValue;

  env.set(statement.name.literal, expressionValue);

  return nullObject;
}

export function evaluateReturnStatement(expression: Expression, env: Environment): Object {
  return createObject(ObjectKind.Return, evaluateExpression(expression, env));
}

export function evaluateStatements(statements: Statement[], env: Environment): Object {
  let object = createObject(ObjectKind.Null);

  for (let statement of statements) {
    object = evaluate(statement, env);
    if (object.kind === ObjectKind.Error) return object;
    else if (object.kind === ObjectKind.Return) return object.value as Object;
  }

  return object;
}
