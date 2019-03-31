/* tslint:disable:no-console */

import { Object, ObjectKind } from '../evaluator/types';
import { Token, TokenKind } from '../lexer/types';
import { AssertionError, AssertionErrorKind } from './types';

export function createAssertionError(errorKind: AssertionErrorKind, actualToken: Token, expectedTokenKind: TokenKind = TokenKind.Illegal): AssertionError {
  let commonPart = `${errorKind}(${actualToken.column}, ${actualToken.line}):`;

  switch (errorKind) {
    case AssertionErrorKind.InvalidIdentifier:
      return {
        message: `${commonPart} ${actualToken.literal} identifier not found`
      };
    case AssertionErrorKind.InvalidToken:
      return {
        message: `${commonPart} expected ${TokenKind[expectedTokenKind]}, got ${TokenKind[actualToken.kind]} instead`
      };
    case AssertionErrorKind.UnknownOperator:
      return {
        message: `${commonPart} ${TokenKind[actualToken.kind]} operator is invalid for ${TokenKind[expectedTokenKind]}`
      };
    default:
      return {
        message: `${commonPart} got ${TokenKind[actualToken.kind]}`
      };
  }
}

export function createCustomAssertionError(errorKind: AssertionErrorKind, message: string, column: number, line: number): AssertionError {
  return {
    message: `${errorKind}(${column}, ${line}): ${message}`
  };
}

export function print(result: Object): void {
  switch (result.kind) {
    case ObjectKind.Array:
      let elements = result.value as Object[];
      let values = elements.map(element => element.value).join(', ');
      return console.log(`[${values}]`);
    case ObjectKind.Puts:
      let objects = result.value as Object[];
      return objects.forEach(object => console.log(object.value));
    case ObjectKind.Null:
      return console.log(null);
    default:
      console.log(result.value);
  }
}
