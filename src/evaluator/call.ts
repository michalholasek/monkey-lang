import { Token } from '../lexer/types';
import { CallExpression } from '../parser/ast/types';
import { Environment, Object, ObjectKind } from './types';

import { createEnclosedEnvironment, createObject } from './helpers';
import { evaluateIdentifierExpression } from './identifier';
import { evaluateStatements } from './index';
import { evaluateExpressionList } from './list';

export function evaluateCallExpression(expression: CallExpression, env: Environment): Object {
  let fn;
  let args;
  if (expression.identifier) {
    fn = env.get(expression.identifier.literal);
    fn = fn ? fn : evaluateIdentifierExpression(expression, env);
  } else fn = expression;

  fn = fn as Object;
  if (!fn.env) fn.env = env;

  if (expression.arguments) {
    args = evaluateExpressionList(expression.arguments, env);
  }

  switch (fn.kind) {
    case ObjectKind.BuiltIn:
      if (fn.fn) return fn.fn(expression, args);
      break;
    default:
      return applyFunction(fn as Object, args);
  }

  return createObject(ObjectKind.Null);
}

function applyFunction(fn: Object, args: Object[] | undefined): Object {
  let { body, parameters } = fn.value as Object;
  let env = fn.env;

  if (env && parameters && args) env = encloseEnvironment(parameters, args, env);
  if (env && body) return evaluateStatements(body.statements, env);

  return createObject(ObjectKind.Null);
}

function encloseEnvironment(params: Token[], args: Object[], outer: Environment): Environment {
  let env = createEnclosedEnvironment(outer);

  for (let i = 0; i < params.length; i++) {
    env.set(params[i].literal, args[i]);
  }

  return env;
}
