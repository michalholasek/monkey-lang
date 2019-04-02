import { Token, TokenKind } from '../../lexer/types';
import { ExpressionParseResult, Precedence } from '../types';

import { ExpressionKind, InfixExpression, PrefixExpression } from '../ast/types';
import { Skip } from '../constants';
import { createExpression, ParsingFunctions } from './helpers';
import { parseExpression } from './index';

export function parsePrefixExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let currentToken = tokens[cursor];

  switch (currentToken.kind) {
    case TokenKind.Int:
    case TokenKind.Identifier:
    case TokenKind.True:
    case TokenKind.False:
    case TokenKind.LeftParenthesis:
    case TokenKind.If:
    case TokenKind.Function:
    case TokenKind.String:
    case TokenKind.LeftBracket:
    case TokenKind.LeftBrace:
      return ParsingFunctions[currentToken.kind](tokens, cursor);
    default:
      return expandPrefixExpression(tokens, cursor);
  }
}

function expandPrefixExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let operator = tokens[cursor];
  let expression: PrefixExpression;
  let left: InfixExpression;

  left = createExpression(ExpressionKind.Prefix, [operator]);
  left.operator = operator;

  let prefixExpressionParseResult = parseExpression(tokens, cursor + Skip.Operator, Precedence.Prefix);
  expression = createExpression(ExpressionKind.Prefix, left.tokens.concat(prefixExpressionParseResult.expression.tokens));
  expression.left = left;
  expression.right = prefixExpressionParseResult.expression;

  return {
    expression,
    cursor: prefixExpressionParseResult.cursor,
    nextPrecedence: prefixExpressionParseResult.nextPrecedence
  };
}
