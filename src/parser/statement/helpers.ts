import { Token, TokenKind } from '../../lexer/types';
import { NodeKind } from '../ast/types';
import { StatementParseResult } from '../types';

import { createStatement } from '../ast';
import { Skip } from '../constants';
import { assertStatement } from './assertions';

export function createStatementParseResult(tokens: Token[], tokenRangeStart: number): StatementParseResult {
  let tokenRangeEnd = determineStatementTokenRangeEnd(tokens, tokenRangeStart);
  let startToken = tokens[tokenRangeStart];
  let statementKind = determineStatementKind(startToken.kind);
  let errors = statementKind !== NodeKind.Expression ? assertStatement(tokens, tokenRangeStart).errors : [];

  return {
    errors,
    statement: errors.length ? {} : createStatement(tokens, tokenRangeStart, tokenRangeEnd),
    tokenRangeEnd,
    tokenRangeStart
  };
}

export function determineStatementKind(startTokenKind: TokenKind): NodeKind {
  switch (startTokenKind) {
    case TokenKind.Let: return NodeKind.Let;
    case TokenKind.Return: return NodeKind.Return;
    default: return NodeKind.Expression;
  }
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
