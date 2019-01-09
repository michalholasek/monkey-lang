import { Token, TokenKind } from '../../lexer/types';
import { AssertionError, ExpressionValue } from '../ast/types';
import { AssertionResult } from '../types';

export function createAssertionResult(errors: AssertionError[] = []): AssertionResult {
  return {
    errors
  };
}

export function evaluateExpression(tokens: Token[]): ExpressionValue {
  return tokens.reduce((_, current) => {
    return current.kind === TokenKind.Int ? parseIntegerExpression(current.literal) : current.literal;
  }, '');
}

function parseIntegerExpression(literal: string): ExpressionValue {
  return parseInt(literal, 10);
}
