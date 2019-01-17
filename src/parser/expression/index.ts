import { Token } from '../../lexer/types';
import { Expression } from '../ast/types';
import { AssertionResult, Precedence } from '../types';

import {
  createAssertionResult,
  parseExpression
} from './helpers';

export function assertExpression(): AssertionResult {
  return createAssertionResult();
}

export function parseStatementExpression(tokens: Token[]): Expression {
  let cursor = 0;
  return parseExpression(tokens, cursor, Precedence.Lowest).expression;
}
