import { Token } from '../../lexer/types';
import { Expression } from '../ast/types';
import { AssertionResult } from '../types';

import { createAssertionResult, evaluateExpression } from './helpers';

export function assertExpression(): AssertionResult {
  return createAssertionResult();
}

export function parseExpression(tokens: Token[]): Expression {
  return {
    tokens,
    value: evaluateExpression(tokens)
  };
}
