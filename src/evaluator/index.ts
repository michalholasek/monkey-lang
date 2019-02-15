import {
  Expression,
  ExpressionKind,
  Node,
  NodeKind,
  Program,
  Statement
} from '../parser/ast/types';

import { TokenKind } from '../lexer/types';
import { Object, ObjectKind } from './types';

import { createObject, determineExpressionKind } from './helpers';

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
  let expressionKind = determineExpressionKind(expression);
  let objectKind;

  switch (expressionKind) {
    case ExpressionKind.Integer:
      objectKind = ObjectKind.Integer;
      break;
    case ExpressionKind.Boolean:
      objectKind = ObjectKind.Boolean;
      break;
    case ExpressionKind.Prefix:
      return evaluatePrefixExpression(expression);
    default:
      objectKind = ObjectKind.Null;
  }

  return createObject(objectKind, expression.value);
}

function evaluateBangOperatorExpression(right: Expression): Object {
  let rightValue = evaluateExpressionNode(right);
  return createObject(ObjectKind.Boolean, !rightValue.value);
}

function evaluateMinusPrefixOperatorExpression(right: Expression): Object {
  let rightValue = evaluateExpressionNode(right);

  if (rightValue.kind !== ObjectKind.Integer) return createObject(ObjectKind.Null);

  // @ts-ignore
  return createObject(ObjectKind.Integer, -rightValue.value);
}

function evaluatePrefixExpression(expression: Expression): Object {
  let object = createObject(ObjectKind.Null);

  if (!expression.left || !expression.left.operator || !expression.right) {
    return object;
  }

  switch (expression.left.operator.kind) {
    case TokenKind.Bang:
      return evaluateBangOperatorExpression(expression.right);
    case TokenKind.Minus:
      return evaluateMinusPrefixOperatorExpression(expression.right);
    default:
      return object;
  }
}

function evaluateProgramNode(program: Program): Object {
  let object = createObject(ObjectKind.Null);

  program.statements.forEach(statement => {
    object = evaluate(statement);
  });

  return object;
}
