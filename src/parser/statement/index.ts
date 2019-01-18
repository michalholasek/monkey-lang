import { Token, TokenKind } from '../../lexer/types';
import { BlockStatementParseResult, StatementParseResult } from '../types';

import { createStatementParseResult } from './helpers';

export function parseBlockStatement(tokens: Token[], cursor: number): BlockStatementParseResult {
  let statements = [];
  let nextToken = tokens[cursor];
  let index = cursor;

  while (nextToken && nextToken.kind !== TokenKind.RightBrace) {
    if (nextToken.kind !== TokenKind.Semicolon) {
      let statementParseResult = parseStatement(tokens, index);
      index = statementParseResult.tokenRangeEnd;
      statements.push(statementParseResult.statement);
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

export function parseStatement(tokens: Token[], tokenRangeStart: number): StatementParseResult {
  return createStatementParseResult(tokens, tokenRangeStart);
}
