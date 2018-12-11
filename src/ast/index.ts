import {
  Expression,
  Identifier,
  Program,
  Statement,
  StatementKind
} from './types';

import { Token } from '../lexer/types';

export function createASTStructure(): Program {
  return {
    statements: []
  };
}

export function createStatementNode(
  kind: StatementKind,
  name: Identifier,
  tokens: Token[],
  expression: Expression
): Statement {
  return {
    kind,
    name,
    tokens,
    expression
  };
}
