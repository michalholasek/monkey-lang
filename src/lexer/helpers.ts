import { Keywords, Token, TokenizationOptions, TokenizationResult, TokenKind } from './types';

export function createToken(literal: string, column: number, line: number): Token {
  let token: Token = { column, kind: TokenKind.Illegal, line, literal };

  switch (literal) {
    case '=':
      token.kind = TokenKind.Assign;
      break;
    case '==':
      token.kind = TokenKind.Equal;
      break;
    case '!=':
      token.kind = TokenKind.NotEqual;
      break;
    case '+':
      token.kind = TokenKind.Plus;
      break;
    case '-':
      token.kind = TokenKind.Minus;
      break;
    case '*':
      token.kind = TokenKind.Asterisk;
      break;
    case '!':
      token.kind = TokenKind.Bang;
      break;
    case '>':
      token.kind = TokenKind.GreaterThan;
      break;
    case '<':
      token.kind = TokenKind.LessThan;
      break;
    case '/':
      token.kind = TokenKind.Slash;
      break;
    case ';':
      token.kind = TokenKind.Semicolon;
      break;
    case ',':
      token.kind = TokenKind.Comma;
      break;
    case '(':
      token.kind = TokenKind.LeftParenthesis;
      break;
    case ')':
      token.kind = TokenKind.RightParenthesis;
      break;
    case '{':
      token.kind = TokenKind.LeftBrace;
      break;
    case '}':
      token.kind = TokenKind.RightBrace;
      break;
    case '[':
      token.kind = TokenKind.LeftBracket;
      break;
    case ']':
      token.kind = TokenKind.RightBracket;
      break;
    case ':':
      token.kind = TokenKind.Colon;
      break;
    case '':
      token.kind = TokenKind.EOF;
      break;
    default:
      if (isString(literal)) {
        token.kind = TokenKind.String;
        token.literal = token.literal.replace(/"/g, '');
      } else if (isValidLiteral(literal)) {
        token.kind = determineValidLiteralTokenKind(literal);
      } else if (isNumber(literal)) {
        token.kind = TokenKind.Int;
      } else {
        token.kind = TokenKind.Illegal;
      }
  }

  return token;
}

export function isLetter(literal: string): boolean {
  return /[a-z_]/i.test(literal);
}

export function isNewlineOrReturnCharacter(literal: string): boolean {
  return /\n|\r/.test(literal);
}

export function isNumber(literal: string): boolean {
  return /[0-9]/g.test(literal);
}

export function isQuote(literal: string): boolean {
  return /"/g.test(literal);
}

// Sticky operators can form `==` or `!=`
export function isStickyOperator(literal: string): boolean {
  return /[!=]/.test(literal);
}

export function isWhiteSpace(literal: string): boolean {
  return /\s/g.test(literal);
}

export function tokenizeStickyOperatorLiteral(opts: TokenizationOptions): TokenizationResult {
  let { characters, column, line, index } = opts;

  let currentCharacter = characters[index];
  let nextCharacter = characters[index + 1];
  let currentColumn = column;
  let operatorLiteral;

  if (isStickyOperator(nextCharacter) && isValidStickyOperator(currentCharacter, nextCharacter)) {
    operatorLiteral = [currentCharacter, nextCharacter].join('');
    currentColumn++;
    index++;
  } else {
    operatorLiteral = currentCharacter;
  }

  return {
    column: currentColumn,
    index,
    token: createToken(operatorLiteral, column, line)
  };
}

export function tokenizeStringLiteral(opts: TokenizationOptions): TokenizationResult {
  let { characters, column, line, index } = opts;

  let currentCharacter = characters[index];
  let currentColumn = column;
  let buffer = [];

  buffer.push(currentCharacter);

  index++;
  currentCharacter = characters[index];
  currentColumn++;

  while (!isQuote(currentCharacter) && index < characters.length) {
    buffer.push(currentCharacter);
    index++;
    currentColumn++;
    currentCharacter = characters[index];
  }

  buffer.push(currentCharacter);

  return {
    column: currentColumn,
    index,
    token: createToken(buffer.join(''), column, line)
  };
}

function determineValidLiteralTokenKind(literal: string): TokenKind {
  if (Keywords[literal]) { return Keywords[literal]; }
  return TokenKind.Identifier;
}

function isString(literal: string): boolean {
  return literal.indexOf('"') === 0;
}

function isValidLiteral(literal: string): boolean {
  return /[a-z_]/gi.test(literal);
}

function isValidStickyOperator(literalA: string, literalB: string): boolean {
  if (literalA === '!' && literalA === literalB) return false;
  return true;
}
