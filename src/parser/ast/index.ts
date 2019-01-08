import {
  AssertionError,
  Expression,
  Program,
  Statement,
  StatementKind
} from './types';

import { Token, TokenKind } from '../../lexer/types';

export function createASTStructure(
  errors: AssertionError[] = [], statements: Statement[] = []
): Program {
  return {
    errors,
    statements
  };
}

export function createStatementNode(
  tokens: Token[],
  statementTokenRangeStart: number,
  statementTokenRangeEnd: number,
  kind: StatementKind
): Statement {
  let statement = {
    expression: getStatementExpression(tokens, statementTokenRangeStart, statementTokenRangeEnd),
    tokens: getStatementTokens(tokens, statementTokenRangeStart, statementTokenRangeEnd),
    kind
  };

  if (kind === StatementKind.Let) {
    statement = Object.assign({}, statement, {
      name: getStatementIdentifierToken(tokens, statementTokenRangeStart, statementTokenRangeEnd)
    });
  }

  return statement;
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
    if (currentToken.kind === TokenKind.Assign || currentToken.kind === TokenKind.Return) {
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

function getStatementIdentifierToken(tokens: Token[], start: number, end: number): Token {
  let currentToken = { column: -1, kind: TokenKind.Illegal, line: -1, literal: '' };

  for (let i = start; i < end; i++) {
    currentToken = tokens[i];
    if (currentToken.kind === TokenKind.Identifier) {
      break;
    }
  }

  return currentToken;
}

function getStatementTokens(tokens: Token[], start: number, end: number): Token[] {
  return tokens.slice(start, end);
}
