import { Keywords, Token, TokenKind } from './types';

function createToken(literal: string, column: number, line: number): Token {
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
  if (Keywords[literal]) { return Keywords[literal]; }
  return TokenKind.Identifier;
}

function isNewlineOrReturnCharacter(literal: string): boolean {
  return /\n|\r/.test(literal);
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

export function tokenize(input: string): Token[] {
  const characters: string[] = input.split('');
  let index: number = 0;
  let tokens: Token[] = [];
  let buffer: string[] = [];
  let currentColumn: number = 2;
  let currentLine: number = 1;

  while (index < characters.length) {
    let currentCharacter = characters[index];

    if (isLetter(currentCharacter) || isNumber(currentCharacter)) {
      buffer.push(currentCharacter);
    } else if (isStickyOperator(currentCharacter)) {
      let nextCharacter = characters[index + 1];
      let operatorColumn = currentColumn;
      let operatorLiteral;

      if (isStickyOperator(nextCharacter)) {
        operatorLiteral = [currentCharacter, nextCharacter].join('');
        currentColumn++;
        index++;
      } else {
        operatorLiteral = currentCharacter;
      }
      tokens.push(createToken(operatorLiteral, operatorColumn, currentLine));
    } else {
      if (buffer.length) {
        tokens.push(createToken(buffer.join(''), currentColumn - buffer.length, currentLine));
        buffer = [];
      }
      if (!isWhiteSpace(currentCharacter)) {
        tokens.push(createToken(currentCharacter, currentColumn, currentLine));
      }
    }

    if (isNewlineOrReturnCharacter(currentCharacter)) {
      currentColumn = 2;
      currentLine++;
    } else {
      currentColumn++;
    }

    index++;
  }

  // Flush buffered characters
  if (buffer.length) {
    tokens.push(createToken(buffer.join(''), currentColumn - buffer.length, currentLine));
  }

  // Create EOF token
  tokens.push(createToken('', currentColumn - 1, currentLine));

  return tokens;
}
