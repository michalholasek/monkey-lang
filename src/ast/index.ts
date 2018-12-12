import {
  AssertionError,
  Expression,
  Identifier,
  Program,
  Statement,
  StatementKind
} from './types';

import { Token } from '../lexer/types';

export function createASTStructure(
  errors: AssertionError[] = [], statements: Statement[] = []
): Program {
  return {
    errors,
    statements
  };
}

export function createStatementNode(
  kind: StatementKind,
  name: Identifier,
  tokens: Token[],
  expression: Expression
): Statement {
  return {
    expression,
    kind,
    name,
    tokens
  };
}
