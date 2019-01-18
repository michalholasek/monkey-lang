import { Token, TokenKind } from '../lexer/types';
import { Program } from './ast/types';

import { createASTStructure } from './ast';
import { Skip } from './constants';
import { parseStatement } from './statement';

export function parse(tokens: Token[]): Program {
  const ast = createASTStructure();
  let currentStatementTokenRangeStart = 0;
  let currentToken;

  while (currentStatementTokenRangeStart < tokens.length) {
    currentToken = tokens[currentStatementTokenRangeStart];

    if (currentToken.kind === TokenKind.EOF) { break; }

    let currentStatementParseResult = parseStatement(tokens, currentStatementTokenRangeStart);
    if (!currentStatementParseResult.errors.length) {
      ast.statements.push(currentStatementParseResult.statement);
    } else {
      ast.errors = ast.errors.concat(currentStatementParseResult.errors);
    }

    // Set index behind last semicolon
    currentStatementTokenRangeStart = currentStatementParseResult.statement ?
      currentStatementParseResult.tokenRangeEnd + Skip.Semicolon :
      tokens.length
    ;
  }

  return ast;
}
