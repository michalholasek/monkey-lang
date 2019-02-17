import {
  Expression,
  ExpressionKind,
  Node,
  NodeKind,
  Program,
  Statement
} from '../parser/ast/types';

import { AssertionErrorKind } from '../common/types';
import { Token, TokenKind } from '../lexer/types';
import { Object, ObjectKind } from './types';

import { createAssertionError } from '../common';
import { createObject, determineExpressionKind } from './helpers';

export function evaluate(node: Node): Object {
  let statement;

  switch (node.kind) {
    case NodeKind.Program:
      let program = node as Program;
      return evaluateStatements(program.statements);
    case NodeKind.Return:
      statement = node as Statement;
      if (statement.expression) return evaluateReturnNode(statement.expression);
      break;
    case NodeKind.Expression:
      statement = node as Statement;
      if (statement.expression) return evaluateExpressionNode(statement.expression);
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
    case ExpressionKind.Infix:
      return evaluateInfixExpression(expression);
    case ExpressionKind.IfElse:
      return evaluateIfElseExpression(expression);
    default:
      objectKind = ObjectKind.Null;
  }

  return createObject(objectKind, expression.value);
}

function evaluateBangOperatorExpression(right: Expression): Object {
  let rightValue = evaluateExpressionNode(right);
  return createObject(ObjectKind.Boolean, !rightValue.value);
}

function evaluateIfElseExpression(expression: Expression): Object {
  if (!expression.condition || !expression.consequence) return createObject(ObjectKind.Null);

  let condition = evaluateExpressionNode(expression.condition);
  if (condition.kind === ObjectKind.Error) return condition;

  if (condition.value && expression.consequence.statements) {
    return evaluateStatements(expression.consequence.statements);
  } else if (expression.alternative) {
    return evaluateStatements(expression.alternative.statements);
  }

  return createObject(ObjectKind.Null);
}

function evaluateInfixExpression(expression: Expression): Object {
  if (!expression.left || !expression.operator || !expression.right) {
    return createObject(ObjectKind.Null);
  }

  let left = evaluateExpressionNode(expression.left);
  if (left.kind === ObjectKind.Error) return left;

  let right = evaluateExpressionNode(expression.right);
  if (right.kind === ObjectKind.Error) return right;

  if (typeof left.value !== typeof right.value) {
    return createObject(
      ObjectKind.Error,
      createAssertionError(AssertionErrorKind.InvalidToken, expression.right.tokens[0], expression.left.tokens[0].kind)
    );
  }

  if (typeof left.value === 'number' && typeof right.value === 'number') {
    return evaluateIntegerInfixExpression(left.value, right.value , expression.operator);
  } else {
    switch (expression.operator.kind) {
      case TokenKind.Equal:
        return createObject(ObjectKind.Boolean, left.value === right.value);
      case TokenKind.NotEqual:
        return createObject(ObjectKind.Boolean, left.value !== right.value);
      default:
      return createObject(
        ObjectKind.Error,
        createAssertionError(AssertionErrorKind.UnknownOperator, expression.operator, expression.left.tokens[0].kind)
      );
    }
  }
}

function evaluateIntegerInfixExpression(left: number, right: number, operator: Token): Object {
  switch (operator.kind) {
    case TokenKind.Plus:
      return createObject(ObjectKind.Integer, left + right);
    case TokenKind.Minus:
      return createObject(ObjectKind.Integer, left - right);
    case TokenKind.Asterisk:
      return createObject(ObjectKind.Integer, left * right);
    case TokenKind.Slash:
      return createObject(ObjectKind.Integer, left / right);
    case TokenKind.GreaterThan:
      return createObject(ObjectKind.Boolean, left > right);
    case TokenKind.LessThan:
      return createObject(ObjectKind.Boolean, left < right);
    case TokenKind.Equal:
      return createObject(ObjectKind.Boolean, left === right);
    case TokenKind.NotEqual:
      return createObject(ObjectKind.Boolean, left !== right);
    default:
      return createObject(ObjectKind.Null);
  }
}

function evaluateMinusPrefixOperatorExpression(right: Expression): Object {
  let rightValue = evaluateExpressionNode(right);
  if (rightValue.kind === ObjectKind.Error) return rightValue;

  if (rightValue.kind !== ObjectKind.Integer) {
    let actualToken = right.tokens[0];
    return createObject(ObjectKind.Error, createAssertionError(AssertionErrorKind.InvalidToken, actualToken, TokenKind.Int));
  }

  if (rightValue.value) return createObject(ObjectKind.Integer, -rightValue.value);

  return createObject(ObjectKind.Null);
}

function evaluatePrefixExpression(expression: Expression): Object {
  if (!expression.left || !expression.left.operator || !expression.right) {
    return createObject(ObjectKind.Null);
  }

  switch (expression.left.operator.kind) {
    case TokenKind.Bang:
      return evaluateBangOperatorExpression(expression.right);
    case TokenKind.Minus:
      return evaluateMinusPrefixOperatorExpression(expression.right);
    default:
      return createObject(ObjectKind.Error, createAssertionError(AssertionErrorKind.UnknownOperator, expression.left.operator));
  }
}

function evaluateReturnNode(expression: Expression): Object {
  return createObject(ObjectKind.Return, evaluateExpressionNode(expression));
}

function evaluateStatements(statements: Statement[]): Object {
  let object = createObject(ObjectKind.Null);

  for (let statement of statements) {
    object = evaluate(statement);
    if (object.kind === ObjectKind.Error) return object;
    else if (object.kind === ObjectKind.Return) return object.value as Object;
  }

  return object;
}
