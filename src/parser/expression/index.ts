import { Token, TokenKind } from '../../lexer/types';
import { Expression } from '../ast/types';
import { AssertionResult } from '../types';

import { createAssertionResult, evaluateExpression } from './helpers';

export function assertExpression(): AssertionResult {
  return createAssertionResult();
}

export function parseExpression(tokens: Token[]): Expression {
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
