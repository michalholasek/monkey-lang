import {
  AssertionError,
  Expression,
  ExpressionValue,
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
    expression: parseStatementExpression(statementTokens),
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

function evaluateExpression(tokens: Token[]): ExpressionValue {
  return tokens.reduce((previous, current) => {
    return current.kind === TokenKind.Int ?
      parseInt(current.literal, 10) :
      previous.concat('', current.literal || '')
    ;
  }, '');
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

function parseStatementExpression(tokens: Token[]): Expression {
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

  return {
    tokens: expressionTokens,
    value: evaluateExpression(expressionTokens)
  };
}
