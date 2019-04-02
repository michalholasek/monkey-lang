import { Expression } from '../parser/ast/types';
import { Environment, Object } from './types';

import { evaluateExpression } from './index';

export function evaluateExpressionList(expressions: Expression[], env: Environment): Object[] {
  let evaluatedExpressions = [];

  for (let arg of expressions) {
    evaluatedExpressions.push(evaluateExpression(arg, env));
  }

  return evaluatedExpressions;
}
