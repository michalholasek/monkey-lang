import { Token, TokenKind } from '../../lexer/types';
import { AssertionError, StatementKind, TokenCoordinates } from '../ast/types';
import { AssertionErrorKind, AssertionResult, StatementParseResult } from '../types';

import { createStatement } from '../ast';
import { Skip } from '../constants';

export function assertStatement(tokens: Token[], tokenRangeStart: number, tokenRangeEnd: number): AssertionResult {
  const assertionResult = createAssertionResult();
  let statementKind = determineStatementKind(tokens[tokenRangeStart].kind);
  let currentToken;
  let nextToken;

  if (statementKind === StatementKind.Expression) {
    return assertionResult;
  }

  for (let i = tokenRangeStart; i < tokenRangeEnd; i++) {
    currentToken = tokens[i];
    nextToken = tokens[i + 1];

    switch (currentToken.kind) {
      case (TokenKind.Let):
        if (nextToken.kind !== TokenKind.Identifier) {
          assertionResult.errors.push(createAssertionError(
            AssertionErrorKind.InvalidToken,
            TokenKind.Identifier,
            nextToken.kind,
            createTokenCoordinates(nextToken)
          ));
        }
        break;
      case (TokenKind.Return):
        if (nextToken.kind !== TokenKind.Int) {
          assertionResult.errors.push(createAssertionError(
            AssertionErrorKind.InvalidToken,
            TokenKind.Identifier,
            nextToken.kind,
            createTokenCoordinates(nextToken)
          ));
        }
        break;
      case (TokenKind.Identifier):
        if (nextToken.kind !== TokenKind.Assign) {
          assertionResult.errors.push(createAssertionError(
            AssertionErrorKind.InvalidToken,
            TokenKind.Assign,
            nextToken.kind,
            createTokenCoordinates(nextToken)
          ));
        }
        break;
      case (TokenKind.Assign):
        if (nextToken.kind !== TokenKind.Int) {
          assertionResult.errors.push(createAssertionError(
            AssertionErrorKind.InvalidToken,
            TokenKind.Int,
            nextToken.kind,
            createTokenCoordinates(nextToken)
          ));
        }
        break;
      case (TokenKind.Int):
        if (nextToken.kind !== TokenKind.Semicolon) {
          assertionResult.errors.push(createAssertionError(
            AssertionErrorKind.InvalidToken,
            TokenKind.Semicolon,
            nextToken.kind,
            createTokenCoordinates(nextToken)
          ));
        }
        break;
    }
  }

  return assertionResult;
}

export function createStatementParseResult(tokens: Token[], tokenRangeStart: number): StatementParseResult {
  let tokenRangeEnd = determineStatementTokenRangeEnd(tokens, tokenRangeStart);
  let errors = assertStatement(tokens, tokenRangeStart, tokenRangeEnd).errors;

  return {
    errors,
    statement: errors.length ? {} : createStatement(tokens, tokenRangeStart, tokenRangeEnd),
    tokenRangeEnd,
    tokenRangeStart
  };
}

export function determineStatementKind(startTokenKind: TokenKind): StatementKind {
  switch (startTokenKind) {
    case TokenKind.Let: return StatementKind.Let;
    case TokenKind.Return: return StatementKind.Return;
    default: return StatementKind.Expression;
  }
}

function createAssertionResult(errors: AssertionError[] = []): AssertionResult {
  return {
    errors
  };
}

function createAssertionError(
  errorKind: string,
  expectedTokenKind: TokenKind,
  actualTokenKind: TokenKind,
  coordinates: TokenCoordinates
): AssertionError {
  const expectedToken = TokenKind[expectedTokenKind];
  const actualToken = TokenKind[actualTokenKind];
  return {
    // tslint:disable-next-line
    message: `${errorKind}(${coordinates.column}, ${coordinates.line}): expected ${expectedToken}, got ${actualToken} instead`
  };
}

function createTokenCoordinates(token: Token): TokenCoordinates {
  return {
    column: token.column,
    line: token.line
  };
}

function determineBlockStatementTokenRangeEnd(tokens: Token[], start: number): number {
  let currentToken = tokens[start];
  let index = start;

  while (index < tokens.length && currentToken && currentToken.kind !== TokenKind.RightBrace) {
    if (currentToken.kind === TokenKind.LeftBrace) {
      index = determineBlockStatementTokenRangeEnd(tokens, index) + Skip.Brace;
    } else {
      index++;
    }
    currentToken = tokens[index];
  }

  return index;
}

function determineStatementTokenRangeEnd(tokens: Token[], start: number): number {
  let currentToken;
  let end = 0;

  for (let index = start; index < tokens.length; index++) {
    currentToken = tokens[index];
    if (currentToken.kind === TokenKind.Semicolon) {
      end = index;
      break;
    } else if (currentToken.kind === TokenKind.LeftBrace) {
      index = determineBlockStatementTokenRangeEnd(tokens, index + Skip.Brace);
    }
  }

  // Enable parsing of simple expressions, eg. '1 + 1' without semicolon
  if (end === 0) {
    end = tokens.length - 1;
  }

  return end;
}
