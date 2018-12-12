import { createASTStructure } from '../ast';
import { parseStatement } from './helpers';

import { Program } from '../ast/types';
import { Token, TokenKind } from '../lexer/types';

export function parse(tokens: Token[]): Program {
  const ast = createASTStructure();
  let currentStatementTokenRangeStart = 0;
  let currentToken;

  while (currentStatementTokenRangeStart < tokens.length) {
    currentToken = tokens[currentStatementTokenRangeStart];

    if (currentToken.kind === TokenKind.EOF) { break; }

    let currentStatementParseResult = parseStatement(tokens, currentToken, currentStatementTokenRangeStart);
    if (!currentStatementParseResult.errors.length) {
      ast.statements.push(currentStatementParseResult.node);
    } else {
      ast.errors = ast.errors.concat(currentStatementParseResult.errors);
    }

    // Set index behind last semicolon
    currentStatementTokenRangeStart = currentStatementParseResult ?
      currentStatementParseResult.tokenRangeEnd + 1 :
      tokens.length
    ;
  }

  return ast;
}
