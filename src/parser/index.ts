import { createASTStructure } from '../ast';
import { parseStatement } from './helpers';

import { Program } from '../ast/types';
import { Token, TokenKind } from '../lexer/types';
import { StatementParseResult } from './types';

export default function parser(tokens: Token[]): Program {
  const ast = createASTStructure();
  let currentStatementParseResult: StatementParseResult|null = null;
  let currentStatementTokenRangeStart = 0;
  let currentToken;

  while (currentStatementTokenRangeStart < tokens.length) {
    currentToken = tokens[currentStatementTokenRangeStart];

    if (currentToken.kind === TokenKind.EOF) { break; }

    currentStatementParseResult = parseStatement(tokens, currentToken, currentStatementTokenRangeStart);
    if (currentStatementParseResult != null) {
      ast.statements.push(currentStatementParseResult.node);
    }

    // Set index behind last semicolon
    currentStatementTokenRangeStart = currentStatementParseResult ?
      currentStatementParseResult.tokenRangeEnd + 1 :
      tokens.length
    ;
  }

  return ast;
}
