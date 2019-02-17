import { Node, NodeKind, Program, Statement } from '../parser/ast/types';
import { Environment, Object, ObjectKind } from './types';

import {
  createObject,
  evaluateExpression,
  evaluateLetStatement,
  evaluateReturnStatement
} from './helpers';

export function createEnvironment(): Environment {
  let store: { [key: string]: Object } = {};

  return {
    get(key) {
      return store[key];
    },
    set(key, object) {
      return store[key] = object;
    }
  };
}

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

export function evaluateStatements(statements: Statement[], env: Environment): Object {
  let object = createObject(ObjectKind.Null);

  for (let statement of statements) {
    object = evaluate(statement, env);
    if (object.kind === ObjectKind.Error) return object;
    else if (object.kind === ObjectKind.Return) return object.value as Object;
  }

  return object;
}
