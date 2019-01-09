import { Token, TokenKind } from '../../lexer/types';
import { AssertionError, ExpressionValue } from '../ast/types';
import { AssertionResult } from '../types';

export function createAssertionResult(errors: AssertionError[] = []): AssertionResult {
  return {
    errors
  };
}

export function evaluateExpression(tokens: Token[]): ExpressionValue {
  return tokens.reduce((previous, current) => {
    return current.kind === TokenKind.Int ?
      parseInt(current.literal, 10) :
      previous.concat('', current.literal || '')
    ;
  }, '');
}
