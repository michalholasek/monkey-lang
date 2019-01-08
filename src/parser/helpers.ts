import { createStatementNode } from './ast';

import { Token, TokenKind } from '../lexer/types';
import {
  AssertionError,
  Statement,
  StatementKind,
  TokenCoordinates
} from './ast/types';

import {
  AssertionErrorKind,
  AssertionResult,
  StatementParseResult
} from './types';

export function parseStatement(
  tokens: Token[], startToken: Token, statementTokenRangeStart: number
): StatementParseResult {
  let statementKind = determineStatementKind(startToken.kind);
  let statementParseResult;
  let statementTokenRangeEnd = getStatementTokenRangeEnd(tokens, statementTokenRangeStart);

  let assertionResult = startToken.kind === TokenKind.Let || startToken.kind === TokenKind.Return ?
    assertStatement(tokens, statementTokenRangeStart, statementTokenRangeEnd) :
    assertExpression()
  ;

  if (!assertionResult.errors.length) {
    statementParseResult = createStatementParseResult(
      [], // No errors during parsing
      createStatementNode(
        tokens,
        statementTokenRangeStart,
        statementTokenRangeEnd,
        statementKind
      ),
      statementTokenRangeStart,
      statementTokenRangeEnd
    );
  } else {
    statementParseResult = createStatementParseResult(
      assertionResult.errors,
      {}, // Empty statement, there were errors during parsing
      statementTokenRangeStart,
      statementTokenRangeEnd
    );
  }

  return statementParseResult;
}

function assertExpression(): AssertionResult {
  return createAssertionResult();
}

function assertStatement(
  tokens: Token[], tokenRangeStart: number, tokenRangeEnd: number
): AssertionResult {
  const assertionResult = createAssertionResult();
  let currentToken;
  let nextToken;

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

function createStatementParseResult(
  errors: AssertionError[] = [],
  statement: Statement = {},
  tokenRangeStart: number = 0,
  tokenRangeEnd: number = 0
): StatementParseResult {
  return {
    errors,
    node: statement,
    tokenRangeEnd,
    tokenRangeStart
  };
}

function createTokenCoordinates(token: Token): TokenCoordinates {
  return {
    column: token.column,
    line: token.line
  };
}

function determineStatementKind(startTokenKind: TokenKind): StatementKind {
  switch (startTokenKind) {
    case TokenKind.Let: return StatementKind.Let;
    case TokenKind.Return: return StatementKind.Return;
    default: return StatementKind.Expression;
  }
}

function getStatementTokenRangeEnd(tokens: Token[], start: number): number {
  let currentToken;
  let end = 0;

  for (let i = start; i < tokens.length; i++) {
    currentToken = tokens[i];
    if (currentToken.kind === TokenKind.Semicolon) {
      end = i;
      break;
    }
  }

  return end;
}
