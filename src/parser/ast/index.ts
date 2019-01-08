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
  let statementTokens = getStatementTokens(tokens, statementTokenRangeStart, statementTokenRangeEnd);

  let statement = {
    expression: getStatementExpression(statementTokens),
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

function evaluateExpression(tokens: Token[]): string {
  return tokens.reduce((previous, current) => {
    return previous.concat('', current.literal || '');
  }, '');
}

function getStatementExpression(tokens: Token[]): Expression {
  let expressionTokens = tokens;

  if (tokens.filter(token => token.kind === TokenKind.Assign).length) {
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

  return {
    tokens: expressionTokens,
    value: evaluateExpression(expressionTokens)
  };
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
