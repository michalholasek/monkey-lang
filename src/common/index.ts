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
