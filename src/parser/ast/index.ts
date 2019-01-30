import { Token, TokenKind } from '../../lexer/types';

import {
  AssertionError,
  NodeKind,
  Program,
  Statement
} from './types';

import { parseStatementExpression } from '../expression';
import { determineStatementKind } from '../statement/helpers';

export function createASTStructure(errors: AssertionError[] = [], statements: Statement[] = []): Program {
  return {
    errors,
    kind: NodeKind.Program,
    statements
  };
}

export function createStatement(tokens: Token[], tokenRangeStart: number, tokenRangeEnd: number): Statement {
  let statementTokens = getStatementTokens(tokens, tokenRangeStart, tokenRangeEnd);
  let expressionTokens = getStatementExpressionTokens(statementTokens);
  let startToken = tokens[tokenRangeStart];

  let statement = {
    expression: parseStatementExpression(expressionTokens).expression,
    tokens: statementTokens,
    kind: determineStatementKind(startToken.kind)
  };

  if (statement.kind === NodeKind.Let) {
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
