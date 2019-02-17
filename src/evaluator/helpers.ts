import { AssertionErrorKind } from '../common/types';
import { Token, TokenKind } from '../lexer/types';
import { Expression, ExpressionKind, ExpressionValue } from '../parser/ast/types';
import { Object, ObjectKind } from './types';

import { createAssertionError } from '../common';
import { evaluateStatements } from './index';

export function createObject(kind: ObjectKind, value: ExpressionValue = 0): Object {
  switch (kind) {
    case ObjectKind.Integer:
    case ObjectKind.Boolean:
    case ObjectKind.Return:
    case ObjectKind.Error:
      return { kind, value };
    default:
      return { kind: ObjectKind.Null };
  }
}

export function determineExpressionKind(expression: Expression): ExpressionKind {
  if (expression.kind) return expression.kind;
  else if (expression.left && expression.operator && expression.right) return ExpressionKind.Infix;
  else if (expression.left && expression.left.operator) return ExpressionKind.Prefix;
  else if (expression.condition) return ExpressionKind.IfElse;

  return ExpressionKind.Illegal;
}

export function evaluateExpression(expression: Expression): Object {
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

export function evaluateReturnStatement(expression: Expression): Object {
  return createObject(ObjectKind.Return, evaluateExpression(expression));
}

function evaluateBangOperatorExpression(right: Expression): Object {
  let rightValue = evaluateExpression(right);
  return createObject(ObjectKind.Boolean, !rightValue.value);
}

function evaluateIfElseExpression(expression: Expression): Object {
  if (!expression.condition || !expression.consequence) return createObject(ObjectKind.Null);

  let condition = evaluateExpression(expression.condition);
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

  let left = evaluateExpression(expression.left);
  if (left.kind === ObjectKind.Error) return left;

  let right = evaluateExpression(expression.right);
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
  let rightValue = evaluateExpression(right);
  if (rightValue.kind === ObjectKind.Error) return rightValue;

  if (rightValue.kind !== ObjectKind.Integer) {
    return createObject(ObjectKind.Error, createAssertionError(AssertionErrorKind.InvalidToken, right.tokens[0], TokenKind.Int));
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
