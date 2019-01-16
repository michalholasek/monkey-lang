import { Token, TokenKind } from '../../lexer/types';
import { BlockStatementParseResult, StatementParseResult } from '../types';

import { createStatementNode } from '../ast';
import { assertExpression } from '../expression';

import {
  assertStatement,
  createStatementParseResult,
  determineStatementKind,
  determineStatementTokenRangeEnd
} from './helpers';

export function parseBlockStatement(tokens: Token[], cursor: number): BlockStatementParseResult {
  let statements = [];
  let nextToken = tokens[cursor];
  let index = cursor;

  while (nextToken && nextToken.kind !== TokenKind.RightBrace) {
    if (nextToken.kind !== TokenKind.Semicolon) {
      let statementParseResult = parseStatement(tokens, nextToken, index);
      index = statementParseResult.tokenRangeEnd;
      statements.push(statementParseResult.node);
    } else {
      index++;
    }
    nextToken = tokens[index];
  }

  return {
    statements,
    cursor: index,
    tokens: tokens.slice(cursor, index)
  };
}

export function parseStatement(
  tokens: Token[], startToken: Token, statementTokenRangeStart: number
): StatementParseResult {
  let statementKind = determineStatementKind(startToken.kind);
  let statementParseResult;
  let statementTokenRangeEnd = determineStatementTokenRangeEnd(tokens, statementTokenRangeStart);

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
