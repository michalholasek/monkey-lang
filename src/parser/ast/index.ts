import { Token, TokenKind } from '../../lexer/types';

import {
  AssertionError,
  Program,
  Statement,
  StatementKind
} from './types';

import { parseExpression } from '../expression';

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
  let statementTokens = getStatementTokens(tokens, statementTokenRangeStart, statementTokenRangeEnd);

  let statement = {
    expression: parseExpression(statementTokens),
    tokens: statementTokens,
    kind
  };

  if (kind === StatementKind.Let) {
    statement = Object.assign({}, statement, {
      name: getStatementIdentifierToken(statementTokens)
    });
  }

  return statement;
}

function getStatementIdentifierToken(tokens: Token[]): Token {
  return tokens
    .filter(token => token.kind === TokenKind.Identifier)
    .reduce((_, currentToken) => {
      return currentToken;
    });
}

function getStatementTokens(tokens: Token[], start: number, end: number): Token[] {
  return tokens.slice(start, end);
}
