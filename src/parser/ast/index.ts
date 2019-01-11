import { Token, TokenKind } from '../../lexer/types';

import {
  AssertionError,
  Program,
  Statement,
  StatementKind
} from './types';

import { parseStatementExpression } from '../expression';

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
  let expressionTokens = getStatementExpressionTokens(statementTokens);

  let statement = {
    expression: parseStatementExpression(expressionTokens),
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

function getStatementExpressionTokens(tokens: Token[]): Token[] {
  const containsAssignToken = tokens.filter(token => token.kind === TokenKind.Assign).length;
  let expressionTokens = tokens;

  if (containsAssignToken) {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].kind === TokenKind.Assign) {
        expressionTokens = tokens.slice(i + 1);
      }
    }
  } else {
    expressionTokens = tokens.filter(token => {
      return token.kind !== TokenKind.Return;
    });
  }

  return expressionTokens;
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
