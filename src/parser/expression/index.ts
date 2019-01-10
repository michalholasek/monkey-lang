import { Token, TokenKind } from '../../lexer/types';
import { Expression, PrefixExpression } from '../ast/types';
import { AssertionResult } from '../types';

import { createAssertionResult, evaluateExpression } from './helpers';

export function assertExpression(): AssertionResult {
  return createAssertionResult();
}

export function parseExpression(tokens: Token[]): Expression {
  let expression = createExpression(tokens);
  const hasPrefixToken = detectPrefixToken(tokens);

  if (hasPrefixToken) {
    let prefixExpression = parsePrefixExpression(tokens);
    expression = Object.assign({}, expression, {
      operands: [prefixExpression]
    });
  }

  expression = Object.assign({}, expression, {
    value: evaluateExpression(tokens)
  });

  return expression;
}

function createExpression(tokens: Token[]): Expression {
  return { tokens, value: '' };
}

function detectPrefixToken(tokens: Token[]): boolean {
  let hasPrefixToken = false;

  for (let token of tokens) {
    switch (token.kind) {
      case TokenKind.Bang:
      case TokenKind.Minus:
        hasPrefixToken = true;
        break;
    }
  }

  return hasPrefixToken;
}

function parsePrefixExpression(tokens: Token[]): PrefixExpression {
  const prefix = tokens[0];
  const rightOperandTokens = tokens.slice(1);

  return {
    operator: prefix,
    right: parseExpression(rightOperandTokens),
    tokens
  };
}
