import { Token, TokenKind } from '../../lexer/types';
import { AssertionError } from '../ast/types';
import { AssertionErrorKind, AssertionResult } from '../types';

export function assertStatement(tokens: Token[], tokenRangeStart: number): AssertionResult {
  let startToken = tokens[tokenRangeStart];

  switch (startToken.kind) {
    case TokenKind.Let:
      return assertLetStatement(tokens, tokenRangeStart);
    case TokenKind.Return:
      return assertReturnStatement(tokens, tokenRangeStart);
    default:
      return createAssertionResult();
  }
}

function assertLetStatement(tokens: Token[], tokenRangeStart: number): AssertionResult {
  let identifierToken = tokens[tokenRangeStart + 1];
  let assignToken = tokens[tokenRangeStart + 2];
  let assertionResult = createAssertionResult();

  if (identifierToken.kind !== TokenKind.Identifier) {
    assertionResult.errors.push(createAssertionError(AssertionErrorKind.InvalidToken, identifierToken, TokenKind.Identifier));
  }

  if (assignToken.kind !== TokenKind.Assign) {
    assertionResult.errors.push(createAssertionError(AssertionErrorKind.InvalidToken, assignToken, TokenKind.Assign));
  }

  return assertionResult;
}

function assertReturnStatement(tokens: Token[], tokenRangeStart: number): AssertionResult {
  let nextToken = tokens[tokenRangeStart + 1];
  let assertionResult = createAssertionResult();

  switch (nextToken.kind) {
    case TokenKind.Int:
    case TokenKind.Identifier:
    case TokenKind.Function:
    case TokenKind.LeftBrace:
    case TokenKind.LeftParenthesis:
    case TokenKind.Semicolon:
      return assertionResult;
    default:
      assertionResult.errors.push(createAssertionError(AssertionErrorKind.UnexpectedToken, nextToken));
      return assertionResult;
  }
}

function createAssertionError(errorKind: AssertionErrorKind, actualToken: Token, expectedTokenKind: TokenKind = TokenKind.Illegal): AssertionError {
  switch (errorKind) {
    case AssertionErrorKind.InvalidToken:
      return {
        message: `${errorKind}(${actualToken.column}, ${actualToken.line}): expected ${TokenKind[expectedTokenKind]}, got ${TokenKind[actualToken.kind]} instead`
      };
    default:
      return {
        message: `${errorKind}(${actualToken.column}, ${actualToken.line}): got ${TokenKind[actualToken.kind]}`
      };
  }
}

function createAssertionResult(errors: AssertionError[] = []): AssertionResult {
  return {
    errors
  };
}
