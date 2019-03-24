import { AssertionErrorKind } from '../common/types';
import { Token, TokenKind } from '../lexer/types';
import { Expression, ExpressionKind, ExpressionValue, Identifier, Statement } from '../parser/ast/types';
import { Environment, Object, ObjectKind } from './types';

import { createAssertionError } from '../common';
import { createEnclosedEnvironment, evaluateStatements } from './index';

export function createObject(kind: ObjectKind, value: ExpressionValue = 0): Object {
  switch (kind) {
    case ObjectKind.Integer:
    case ObjectKind.Boolean:
    case ObjectKind.Let:
    case ObjectKind.Return:
    case ObjectKind.Error:
    case ObjectKind.Function:
    case ObjectKind.String:
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
  else if (expression.arguments) return ExpressionKind.Call;
  else if (expression.value) return ExpressionKind.Function;

  return ExpressionKind.Illegal;
}

export function evaluateExpression(expression: Expression, env: Environment): Object {
  let expressionKind = determineExpressionKind(expression);
  let objectKind;

  switch (expressionKind) {
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
      return evaluateIdentifier(expression, env);
    case ExpressionKind.Prefix:
      return evaluatePrefixExpression(expression, env);
    case ExpressionKind.Infix:
      return evaluateInfixExpression(expression, env);
    case ExpressionKind.IfElse:
      return evaluateIfElseExpression(expression, env);
    case ExpressionKind.Call:
      return evaluateCallExpression(expression, env);
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

function applyFunction(fn: Object, args: Object[] | undefined): Object {
  let { body, parameters } = fn.value as Object;
  let env = fn.env;

  if (env && parameters && args) env = encloseEnvironment(parameters, args, env);
  if (env && body) return evaluateStatements(body.statements, env);

  return createObject(ObjectKind.Null);
}

function evaluateArguments(args: Expression[], env: Environment): Object[] {
  let evaluatedArguments = [];

  for (let arg of args) {
    evaluatedArguments.push(evaluateExpression(arg, env));
  }

  return evaluatedArguments;
}

function evaluateBangOperatorExpression(right: Expression, env: Environment): Object {
  let rightValue = evaluateExpression(right, env);
  return createObject(ObjectKind.Boolean, !rightValue.value);
}

function evaluateCallExpression(expression: Expression, env: Environment): Object {
  let fn;
  let args;

  if (expression.identifier) fn = env.get(expression.identifier.literal);
  else fn = expression;

  fn = fn as Object;
  if (!fn.env) fn.env = env;

  if (expression.arguments) {
    args = evaluateArguments(expression.arguments, env);
  }

  return applyFunction(fn as Object, args);
}

function evaluateFunctionExpression(expression: Expression, env: Environment): Object {
  let fn = createObject(ObjectKind.Function, expression.value);
  fn.env = env;

  return fn;
}

function evaluateIdentifier(expression: Expression, env: Environment): Object {
  if (!expression.value) return createObject(ObjectKind.Null);

  let identifierValue = env.get(expression.value as string);
  if (!identifierValue || !identifierValue.value) {
    return createObject(
      ObjectKind.Error,
      createAssertionError(AssertionErrorKind.InvalidIdentifier, expression.tokens[0]).message
    );
  }

  return identifierValue;
}

function evaluateIfElseExpression(expression: Expression, env: Environment): Object {
  if (!expression.condition || !expression.consequence) return createObject(ObjectKind.Null);

  let condition = evaluateExpression(expression.condition, env);
  if (condition.kind === ObjectKind.Error) return condition;

  if (condition.value && expression.consequence.statements) {
    return evaluateStatements(expression.consequence.statements, env);
  } else if (expression.alternative) {
    return evaluateStatements(expression.alternative.statements, env);
  }

  return createObject(ObjectKind.Null);
}

function evaluateInfixExpression(expression: Expression, env: Environment): Object {
  if (!expression.left || !expression.operator || !expression.right) {
    return createObject(ObjectKind.Null);
  }

  let left = evaluateExpression(expression.left, env);
  if (left.kind === ObjectKind.Error) return left;

  let right = evaluateExpression(expression.right, env);
  if (right.kind === ObjectKind.Error) return right;

  if (typeof left.value !== typeof right.value) {
    return createObject(
      ObjectKind.Error,
      createAssertionError(AssertionErrorKind.InvalidToken, expression.right.tokens[0], expression.left.tokens[0].kind).message
    );
  }

  if (typeof left.value === 'number' && typeof right.value === 'number') {
    return evaluateIntegerInfixExpression(left.value, right.value , expression.operator);
  } else if (typeof left.value === 'string' && typeof right.value === 'string') {
    return evaluateStringInfixExpression(left.value, right.value , expression.operator);
  } else {
    switch (expression.operator.kind) {
      case TokenKind.Equal:
        return createObject(ObjectKind.Boolean, left.value === right.value);
      case TokenKind.NotEqual:
        return createObject(ObjectKind.Boolean, left.value !== right.value);
      default:
        return createObject(
          ObjectKind.Error,
          createAssertionError(AssertionErrorKind.UnknownOperator, expression.operator, expression.left.tokens[0].kind).message
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

function evaluateMinusPrefixOperatorExpression(right: Expression, env: Environment): Object {
  let rightValue = evaluateExpression(right, env);
  if (rightValue.kind === ObjectKind.Error) return rightValue;

  if (rightValue.kind !== ObjectKind.Integer) {
    return createObject(ObjectKind.Error, createAssertionError(AssertionErrorKind.InvalidToken, right.tokens[0], TokenKind.Int).message);
  }

  if (rightValue.value) return createObject(ObjectKind.Integer, -rightValue.value);

  return createObject(ObjectKind.Null);
}

function evaluatePrefixExpression(expression: Expression, env: Environment): Object {
  if (!expression.left || !expression.left.operator || !expression.right) {
    return createObject(ObjectKind.Null);
  }

  switch (expression.left.operator.kind) {
    case TokenKind.Bang:
      return evaluateBangOperatorExpression(expression.right, env);
    case TokenKind.Minus:
      return evaluateMinusPrefixOperatorExpression(expression.right, env);
    default:
      return createObject(ObjectKind.Error, createAssertionError(AssertionErrorKind.UnknownOperator, expression.left.operator).message);
  }
}

function evaluateStringInfixExpression(left: string, right: string, operator: Token): Object {
  switch (operator.kind) {
    case TokenKind.Plus:
      return createObject(ObjectKind.String, [left, right].join(''));
    default:
      return createObject(
        ObjectKind.Error,
        createAssertionError(AssertionErrorKind.UnknownOperator, operator, TokenKind.String).message
      );
  }
}

function encloseEnvironment(params: Identifier[], args: Object[], outer: Environment): Environment {
  let env = createEnclosedEnvironment(outer);

  for (let i = 0; i < params.length; i++) {
    env.set(params[i].literal, args[i]);
  }

  return env;
}
