import { Expression} from '../ast/types';
import { Token, TokenKind } from '../lexer/types';

function evaluateExpression(tokens : Token[]) : string {
  return tokens.reduce((previous, current) => {
    return previous.concat('', current.literal || '');
  }, '');
}

export function getStatementExpression(tokens : Token[], start : number, end : number) : Expression {
  let currentToken;
  let expressionTokenRangeStart = 0;
  let expressionTokens = [];

  for (let i = start; i < end; i++) {
    currentToken = tokens[i];
    if (currentToken.kind == TokenKind.Assign) {
      expressionTokenRangeStart = i + 1;
      break;
    }
  }

  expressionTokens = tokens.slice(expressionTokenRangeStart, end);

  return {
    tokens: tokens.slice(expressionTokenRangeStart, end),
    value: evaluateExpression(expressionTokens)
  };
}

export function getStatementTokenRangeEnd(tokens : Token[], start : number) : number {
  let currentToken;
  let end = 0;

  for (let i = start; i < tokens.length; i++) {
    currentToken = tokens[i];
    if (currentToken.kind == TokenKind.Semicolon) {
      end = i;
      break;
    }
  }

  return end;
}

export function getStatementTokens(tokens : Token[], start : number, end : number) : Token[] {
  return tokens.slice(start, end);
}

export function getStatementIdentifierToken(tokens : Token[], start : number, end : number) : Token {
  let currentToken = { kind: TokenKind.Illegal, literal : '' };

  for (let i = start; i < end; i++) {
    currentToken = tokens[i];
    if (currentToken.kind == TokenKind.Identifier) {
      break;
    }
  }

  return currentToken;
}
