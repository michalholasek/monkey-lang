import { Expression, Node, NodeKind, Program, Statement } from '../parser/ast/types';
import { TokenKind } from '../lexer/types';
import { Object, ObjectKind } from './types';

import { createObject } from './helpers';

export function evaluate(node: Node): Object {
  switch (node.kind) {
    case NodeKind.Program:
      return evaluateProgramNode(node as Program);
    case NodeKind.Expression:
      const statement = node as Statement;
      return statement.expression ? evaluateExpressionNode(statement.expression) : createObject(ObjectKind.Null);
    default:
      return createObject(ObjectKind.Null);
  }
}

function evaluateExpressionNode(expression: Expression): Object {
  let tokenKind = expression.tokens[0].kind;
  let objectKind;

  switch (tokenKind) {
    case TokenKind.Int:
      objectKind = ObjectKind.Integer;
      break;
    case TokenKind.True:
    case TokenKind.False:
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
