import { AssertionError } from '../../common/types';
import { Token, TokenKind } from '../../lexer/types';
import { Expression, ExpressionKind, ExpressionValue } from '../ast/types';
import {
  AssertionResult,
  ExpressionParseResult,
  FunctionParametersParseResult,
  ParsingFunction,
  Precedence
} from '../types';

import { Include, Skip } from '../constants';
import { parseBlockStatement } from '../statement';

export function createAssertionResult(errors: AssertionError[] = []): AssertionResult {
  return {
    errors
  };
}

export function parseExpression(tokens: Token[], cursor: number, precedence: Precedence): ExpressionParseResult {
  let leftExpressionParseResult = parsePrefixExpression(tokens, cursor);
  let nextPrecedence = leftExpressionParseResult.nextPrecedence;

  cursor = leftExpressionParseResult.cursor;

  while (cursor < tokens.length && precedence < nextPrecedence) {
    leftExpressionParseResult = parseInfixExpression(tokens, leftExpressionParseResult.cursor, leftExpressionParseResult.expression);
    nextPrecedence = leftExpressionParseResult.nextPrecedence;
    cursor = leftExpressionParseResult.cursor;
  }

  return leftExpressionParseResult;
}

export const OperatorPrecedences: { [index: number]: Precedence } = {
  12: Precedence.Equals,      // TokenKind.Equal
  13: Precedence.Equals,      // TokenKind.NotEqual
  10: Precedence.LessGreater, // TokenKind.LessThan
  11: Precedence.LessGreater, // TokenKind.GreaterThan
   5: Precedence.Sum,         // TokenKind.Plus
   6: Precedence.Sum,         // TokenKind.Minus
   8: Precedence.Product,     // TokenKind.Asterisk
   9: Precedence.Product,     // TokenKind.Slash
  23: Precedence.Call         // TokenKind.LeftParenthesis
};

const ParsingFunctions: { [index: number]: ParsingFunction } = {
   2: parseValueExpression,    // TokenKind.Identifier
   3: parseValueExpression,    // TokenKind.Int
  16: parseFunctionExpression, // TokenKind.Function
  18: parseValueExpression,    // TokenKind.True
  19: parseValueExpression,    // TokenKind.False
  20: parseIfExpression,       // TokenKind.If
  23: parseGroupedExpression,  // TokenKind.LeftParenthesis
  27: parseValueExpression     // TokenKind.String
};

function createExpression(tokens: Token[]): Expression {
  return { tokens };
}

function determineOperatorPrecedence(operator: Token): Precedence {
  let precedence;

  if (operator) {
    precedence = OperatorPrecedences[operator.kind];
  }

  return precedence || Precedence.Lowest;
}

function determineExpressionKind(token: Token): ExpressionKind {
  switch (token.kind) {
    case TokenKind.Int:
      return ExpressionKind.Integer;
    case TokenKind.Identifier:
      return ExpressionKind.Identifier;
    case TokenKind.True:
    case TokenKind.False:
      return ExpressionKind.Boolean;
    case TokenKind.String:
      return ExpressionKind.String;
    default:
      return ExpressionKind.Illegal;
  }
}

function expandPrefixExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let operator = tokens[cursor];
  let left = createExpression([operator]);
  left.operator = operator;

  let prefixExpressionParseResult = parseExpression(tokens, cursor + Skip.Operator, Precedence.Prefix);
  let expression = createExpression(left.tokens.concat(prefixExpressionParseResult.expression.tokens));
  expression.left = left;
  expression.right = prefixExpressionParseResult.expression;

  return {
    expression,
    cursor: prefixExpressionParseResult.cursor,
    nextPrecedence: prefixExpressionParseResult.nextPrecedence
  };
}

function parseFunctionExpression(tokens: Token[], cursor: number): ExpressionParseResult {
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

function parseCallExpression(tokens: Token[], cursor: number, left: Expression): ExpressionParseResult {
  let args: Expression[] = [];
  let index = cursor;
  let currentToken = tokens[cursor];
  let argumentParseResult;

  while (index < tokens.length && currentToken.kind !== TokenKind.RightParenthesis) {
    if (currentToken.kind !== TokenKind.Comma) {
      argumentParseResult = parseExpression(tokens, index, Precedence.Lowest);
      args.push(argumentParseResult.expression);
      index = argumentParseResult.cursor;
    } else {
      index++;
    }
    currentToken = tokens[index];
  }

  let expression = createExpression(left.tokens.concat(tokens.slice(cursor - Include.Identifier, index + Include.Parenthesis)));
  expression.arguments = args;

  let identifier = expression.tokens[0];
  if (identifier.kind === TokenKind.Identifier) expression.identifier = identifier;

  // Immediately executed function expression
  if (left.value) expression.value = left.value;

  let nextToken = tokens[index + Skip.Parenthesis];

  return {
    expression,
    cursor: index + Skip.Parenthesis,
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

function parseGroupedExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let expressionParseResult = parseExpression(tokens, cursor + Skip.Parenthesis, Precedence.Lowest);
  let nextToken = tokens[expressionParseResult.cursor];
  let index = 0;

  while (nextToken && nextToken.kind === TokenKind.RightParenthesis) {
    index++;
    nextToken = tokens[expressionParseResult.cursor + index];
  }

  expressionParseResult.cursor = expressionParseResult.cursor + index;
  expressionParseResult.nextPrecedence = determineOperatorPrecedence(nextToken);

  return expressionParseResult;
}

function parseIfExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let conditionParseResult = parseExpression(tokens, cursor + Skip.If, Precedence.Lowest);
  let consequenceParseResult = parseBlockStatement(tokens, conditionParseResult.cursor + Skip.Brace);
  let alternativeParseResult;

  let possibleElseToken = tokens[consequenceParseResult.cursor + 1];

  if (possibleElseToken && possibleElseToken.kind === TokenKind.Else) {
    alternativeParseResult = parseBlockStatement(tokens, consequenceParseResult.cursor + Skip.Brace + Skip.Else + Skip.Brace);
  }

  let ifExpressionParseResultCursor = alternativeParseResult ? alternativeParseResult.cursor : consequenceParseResult.cursor;

  let expression = createExpression(tokens.slice(cursor, ifExpressionParseResultCursor + Include.Brace));
  expression.condition = conditionParseResult.expression;
  expression.consequence = {
    statements: consequenceParseResult.statements,
    tokens: consequenceParseResult.tokens
  };

  if (alternativeParseResult) {
    expression.alternative = {
      statements: alternativeParseResult.statements,
      tokens: alternativeParseResult.tokens
    };
  }

  return {
    expression,
    cursor: ifExpressionParseResultCursor,
    nextPrecedence: Precedence.Lowest
  };
}

function parseInfixExpression(tokens: Token[], cursor: number, left: Expression): ExpressionParseResult {
  let operator = tokens[cursor];
  let currentPrecedence = determineOperatorPrecedence(operator);
  let rightExpressionParseResult;
  let expression;

  if (operator.kind === TokenKind.LeftParenthesis) { // Call expression
    rightExpressionParseResult = parseCallExpression(tokens, cursor + Skip.Parenthesis, left);
    expression = rightExpressionParseResult.expression;
  } else {
    rightExpressionParseResult = parseExpression(tokens, cursor + Skip.Operator, currentPrecedence);
    expression = createExpression(left.tokens.concat([operator]).concat(rightExpressionParseResult.expression.tokens));
    expression.left = left;
    expression.operator = operator;
    expression.right = rightExpressionParseResult.expression;
  }

  return {
    expression,
    cursor: rightExpressionParseResult.cursor,
    nextPrecedence: rightExpressionParseResult.nextPrecedence
  };
}

function parsePrefixExpression(tokens: Token[], cursor: number): ExpressionParseResult {
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
      return ParsingFunctions[currentToken.kind](tokens, cursor);
    default:
      return expandPrefixExpression(tokens, cursor);
  }
}

function parseValueExpression(tokens: Token[], cursor: number): ExpressionParseResult {
  let currentToken = tokens[cursor];
  let nextToken = tokens[cursor + 1];
  let nextPrecedence = determineOperatorPrecedence(nextToken);
  let expression = createExpression([currentToken]);
  expression.value = parseExpressionValue(currentToken);
  expression.kind = determineExpressionKind(currentToken);

  return {
    expression,
    cursor: cursor + 1,
    nextPrecedence
  };
}

function parseExpressionValue(token: Token): ExpressionValue {
  switch (token.kind) {
    case TokenKind.Int:
      return parseInt(token.literal, 10);
    case TokenKind.True:
    case TokenKind.False:
      return token.kind === TokenKind.True ? true : false;
    default:
      return token.literal;
  }
}
