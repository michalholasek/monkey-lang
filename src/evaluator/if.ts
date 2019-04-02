import { IfElseExpression } from '../parser/ast/types';
import { Environment, Object, ObjectKind } from './types';

import { createObject } from './helpers';
import { evaluateExpression, evaluateStatements } from './index';

export function evaluateIfElseExpression(expression: IfElseExpression, env: Environment): Object {
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
