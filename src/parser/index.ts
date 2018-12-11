import {
  createASTStructure,
  createStatementNode
} from '../ast';

import { Program, StatementKind } from '../ast/types';
import { Token, TokenKind } from '../lexer/types';

import {
  getStatementExpression,
  getStatementTokens,
  getStatementIdentifierToken,
  getStatementTokenRangeEnd
} from './helpers';

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
