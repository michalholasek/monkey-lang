import {
  Expression,
  ExpressionKind,
  Node,
  NodeKind,
  Program,
  Statement
} from '../parser/ast/types';

import { Object, ObjectKind } from './types';

import { createObject } from './helpers';

export function evaluate(node: Node): Object {
  switch (node.kind) {
    case NodeKind.Program:
      return evaluateProgramNode(node as Program);
    case NodeKind.Expression:
      const statement = node as Statement;
      if (statement.expression) {
        return evaluateExpressionNode(statement.expression);
      } // Fall through
  }
  return createObject(ObjectKind.Null);
}

function evaluateExpressionNode(expression: Expression): Object {
  let objectKind;

  switch (expression.kind) {
    case ExpressionKind.Integer:
      objectKind = ObjectKind.Integer;
      break;
    case ExpressionKind.Boolean:
      objectKind = ObjectKind.Boolean;
      break;
    default:
      objectKind = ObjectKind.Null;
  }

  return createObject(objectKind, expression.value);
}

function evaluateProgramNode(program: Program): Object {
  let object = createObject(ObjectKind.Null);

  program.statements.forEach(statement => {
    object = evaluate(statement);
  });

  return object;
}
