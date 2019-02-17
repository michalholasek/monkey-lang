import { Node, NodeKind, Program, Statement } from '../parser/ast/types';
import { Object, ObjectKind } from './types';

import { createObject, evaluateExpression, evaluateReturnStatement } from './helpers';

export function evaluate(node: Node): Object {
  let statement;

  switch (node.kind) {
    case NodeKind.Program:
      let program = node as Program;
      return evaluateStatements(program.statements);
    case NodeKind.Return:
      statement = node as Statement;
      if (statement.expression) return evaluateReturnStatement(statement.expression);
      break;
    case NodeKind.Expression:
      statement = node as Statement;
      if (statement.expression) return evaluateExpression(statement.expression);
  }

  return createObject(ObjectKind.Null);
}

export function evaluateStatements(statements: Statement[]): Object {
  let object = createObject(ObjectKind.Null);

  for (let statement of statements) {
    object = evaluate(statement);
    if (object.kind === ObjectKind.Error) return object;
    else if (object.kind === ObjectKind.Return) return object.value as Object;
  }

  return object;
}
