import { Token, TokenKind } from '../../lexer/types';
import { AssertionError, Expression } from '../ast/types';
import { AssertionResult, OperatorPrecedences, Precedence } from '../types';

export function createAssertionResult(errors: AssertionError[] = []): AssertionResult {
  return {
    errors
  };
}

export function createExpression(tokens: Token[]): Expression {
  return { tokens };
}

export function determineOperatorPrecedence(operator: Token): Precedence {
  let precedence;

  if (operator) {
    precedence = OperatorPrecedences[operator.kind];
  }

  return precedence || Precedence.Lowest;
}

export function isLeftParenthesisToken(token: Token): boolean {
  return token.kind === TokenKind.LeftParenthesis;
}

export function isRightParenthesisToken(token: Token): boolean {
  return token.kind === TokenKind.RightParenthesis;
}

export function isPrefixToken(token: Token): boolean {
  return token.kind === TokenKind.Bang || token.kind === TokenKind.Minus;
}
