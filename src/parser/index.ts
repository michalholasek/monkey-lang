import {
  createASTStructure,
  createStatementNode
} from '../ast';

import { Expression, Program, StatementKind } from '../ast/types';
import { Token, TokenKind } from '../lexer/types';

function evaluateExpression(tokens : Token[]) : string {
  return tokens.reduce((previous, current) => {
    return previous.concat('', current.literal || '');
  }, '');
}

function getStatementExpression(tokens : Token[], start : number, end : number) : Expression {
  let currentToken;
  let expressionTokenRangeStart = 0;
  let expressionTokens = [];

  for (let i = start; i < end; i++) {
    currentToken = tokens[i];
    if (currentToken.kind == TokenKind.Assign) {
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

function getStatementTokenRangeEnd(tokens : Token[], start : number) : number {
  let currentToken;
  let end = 0;

  for (let i = start; i < tokens.length; i++) {
    currentToken = tokens[i];
    if (currentToken.kind == TokenKind.Semicolon) {
      end = i;
      break;
    }
  }

  return end;
}

function getStatementTokens(tokens : Token[], start : number, end : number) : Token[] {
  return tokens.slice(start, end);
}

function getStatementIdentifierToken(tokens : Token[], start : number, end : number) : Token {
  let currentToken = { kind: TokenKind.Illegal, literal : '' };

  for (let i = start; i < end; i++) {
    currentToken = tokens[i];
    if (currentToken.kind == TokenKind.Identifier) {
      break;
    }
  }

  return currentToken;
}

export default function parser(tokens : Token[]) : Program {
  const ast = createASTStructure();
  let currentStatement;
  let currentStatementTokenRangeStart = 0;
  let currentStatementTokenRangeEnd = 0;
  let currentToken;

  // Last token is EOF, hence tokens.length - 1. We are not processing
  // it in any way for now
  while (currentStatementTokenRangeStart < tokens.length - 1) {
    currentToken = tokens[currentStatementTokenRangeStart];

    if (currentToken.kind == TokenKind.Let) {
      currentStatementTokenRangeEnd = getStatementTokenRangeEnd(tokens, currentStatementTokenRangeStart);

      currentStatement = createStatementNode(
        StatementKind.Let,
        getStatementIdentifierToken(tokens, currentStatementTokenRangeStart, currentStatementTokenRangeEnd),
        getStatementTokens(tokens, currentStatementTokenRangeStart, currentStatementTokenRangeEnd),
        getStatementExpression(tokens, currentStatementTokenRangeStart, currentStatementTokenRangeEnd)
      );

      ast.statements.push(currentStatement);
    }

    // Set index behind last semicolon
    currentStatementTokenRangeStart = currentStatementTokenRangeEnd + 1;
  }

  return ast;
}
