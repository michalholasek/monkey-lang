import { KEYWORDS, Token, TokenKind } from './types';

function createToken(literal: string): Token {
  let token: Token = { kind: TokenKind.Illegal , literal };

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
      token.kind = TokenKind.GreatThan;
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
    case '':
      token.kind = TokenKind.EOF;
      break;
    default:
      if (isValidLiteral(literal)) {
        token.kind = determineValidLiteralTokenKind(literal);
      } else if (isNumber(literal)) {
        token.kind = TokenKind.Int;
      } else {
        token.kind = TokenKind.Illegal;
      }
  }

  return token;
}

function determineValidLiteralTokenKind(literal: string): TokenKind {
  if (KEYWORDS[literal]) { return KEYWORDS[literal]; }
  return TokenKind.Identifier;
}

// Sticky operators can form `==` or `!=`
function isStickyOperator(literal: string): boolean {
  return /[!=]/.test(literal);
}

function isLetter(literal: string): boolean {
  return /[a-z_]/i.test(literal);
}

function isNumber(literal: string): boolean {
  return /[0-9]/g.test(literal);
}

function isValidLiteral(literal: string): boolean {
  return /[a-z_]/gi.test(literal);
}

function isWhiteSpace(literal: string): boolean {
  return /\s/g.test(literal);
}

export default function (input: string): Token[] {
  const characters: string[] = input.split('');
  let index: number = 0;
  let tokens: Token[] = [];
  let buffer: string[] = [];
  let currentCharacter: string;

  while (index < characters.length) {
    currentCharacter = characters[index];
    if (
      isLetter(currentCharacter) ||
      isNumber(currentCharacter) ||
      isStickyOperator(currentCharacter)
    ) {
      buffer.push(currentCharacter);
    } else {
      if (buffer.length) {
        tokens.push(createToken(buffer.join('')));
        buffer = [];
      }
      if (!isWhiteSpace(currentCharacter)) {
        tokens.push(createToken(currentCharacter));
      }
    }
    index++;
  }

  // Flush buffered tokens
  if (buffer.length) {
    tokens.push(createToken(buffer.join('')));
    buffer = [];
  }

  // Create EOF token
  tokens.push(createToken(''));

  return tokens;
}
