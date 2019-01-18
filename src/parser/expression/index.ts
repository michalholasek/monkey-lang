import { Token } from '../../lexer/types';
import { ExpressionParseResult, Precedence } from '../types';

import { parseExpression } from './helpers';

export function parseStatementExpression(tokens: Token[]): ExpressionParseResult {
  let cursor = 0;
  return parseExpression(tokens, cursor, Precedence.Lowest);
}
