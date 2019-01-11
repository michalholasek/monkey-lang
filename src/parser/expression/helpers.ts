import { AssertionError } from '../ast/types';
import { AssertionResult } from '../types';

export function createAssertionResult(errors: AssertionError[] = []): AssertionResult {
  return {
    errors
  };
}
