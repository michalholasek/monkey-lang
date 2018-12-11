import { createStatementNode } from '../ast';
import { Expression, Statement, StatementKind } from '../ast/types';
import { Token, TokenKind } from '../lexer/types';
import { StatementParseResult } from './types';

export function parseStatement(
  tokens: Token[], startToken: Token, statementTokenRangeStart: number
): StatementParseResult|null {
  let statement;
  let statementTokenRangeEnd = 0;
  let statementParseResult = null;

  if (startToken.kind === TokenKind.Let) {
    statementTokenRangeEnd = getStatementTokenRangeEnd(tokens, statementTokenRangeStart);

    statement = createStatementNode(
      StatementKind.Let,
      getStatementIdentifierToken(tokens, statementTokenRangeStart, statementTokenRangeEnd),
      getStatementTokens(tokens, statementTokenRangeStart, statementTokenRangeEnd),
      getStatementExpression(tokens, statementTokenRangeStart, statementTokenRangeEnd)
    );

    statementParseResult = createStatementParseResult(
      statement,
      statementTokenRangeStart,
      statementTokenRangeEnd
    );
  }

  return statementParseResult;
}

function createStatementParseResult(
  statement: Statement,  tokenRangeStart: number,  tokenRangeEnd: number
): StatementParseResult {
  return {
    node: statement,
    tokenRangeEnd,
    tokenRangeStart
  };
}

function evaluateExpression(tokens: Token[]): string {
  return tokens.reduce((previous, current) => {
    return previous.concat('', current.literal || '');
  }, '');
}

function getStatementExpression(tokens: Token[], start: number, end: number): Expression {
  let currentToken;
  let expressionTokenRangeStart = 0;
  let expressionTokens = [];

  for (let i = start; i < end; i++) {
    currentToken = tokens[i];
    if (currentToken.kind === TokenKind.Assign) {
      expressionTokenRangeStart = i + 1;
      break;
    }
  }

  expressionTokens = tokens.slice(expressionTokenRangeStart, end);

  return {
    tokens: tokens.slice(expressionTokenRangeStart, end),
    value: evaluateExpression(expressionTokens)
  };
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

function getStatementTokens(tokens: Token[], start: number, end: number): Token[] {
  return tokens.slice(start, end);
}

function getStatementIdentifierToken(tokens: Token[], start: number, end: number): Token {
  let currentToken = { kind: TokenKind.Illegal, literal: '' };

  for (let i = start; i < end; i++) {
    currentToken = tokens[i];
    if (currentToken.kind === TokenKind.Identifier) {
      break;
    }
  }

  return currentToken;
}
