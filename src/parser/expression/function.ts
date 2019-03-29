import { Token, TokenKind } from '../../lexer/types';
import { ExpressionParseResult, FunctionParametersParseResult, Precedence } from '../types';

import { Include, Skip } from '../constants';
import { parseBlockStatement } from '../statement';
import { createExpression, determineOperatorPrecedence } from './helpers';

export function parseFunctionExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let parametersParseResult = parseFunctionParameters(tokens, cursor + Skip.Function + Skip.Parenthesis);
  let bodyParseResult = parseBlockStatement(tokens, parametersParseResult.cursor + Skip.Parenthesis + Skip.Brace);
  let functionExpressionTokens = tokens.slice(cursor, bodyParseResult.cursor + Include.Brace);
  let expression = createExpression(functionExpressionTokens);

  expression.value = {
    body: {
      statements: bodyParseResult.statements,
      tokens: bodyParseResult.tokens
    },
    parameters: parametersParseResult.parameters,
    tokens: functionExpressionTokens
  };

  let nextToken = tokens[bodyParseResult.cursor + Skip.Brace];

  return {
    expression,
    cursor: bodyParseResult.cursor + Skip.Brace,
    nextPrecedence: nextToken ? determineOperatorPrecedence(nextToken) : Precedence.Lowest
  };
}

function parseFunctionParameters(tokens: Token[], cursor: number): FunctionParametersParseResult {
  let currentToken = tokens[cursor];
  let index = cursor;
  let parameters: Token[] = [];

  if (currentToken && currentToken.kind === TokenKind.RightParenthesis) {
    return {
      cursor,
      parameters,
      tokens: []
    };
  }

  while (index < tokens.length && currentToken.kind !== TokenKind.RightParenthesis) {
    if (currentToken.kind === TokenKind.Identifier) {
      parameters.push(currentToken);
    }
    index++;
    currentToken = tokens[index];
  }

  return {
    cursor: index,
    parameters,
    tokens: tokens.slice(cursor, index)
  };
}
