import { Keywords, StringTokenizeOptions, StringTokenizeResult, Token, TokenKind } from './types';

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

function isQuote(literal: string): boolean {
  return /"/g.test(literal);
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

function isWhiteSpace(literal: string): boolean {
  return /\s/g.test(literal);
}

function tokenizeStringLiteral(opts: StringTokenizeOptions): StringTokenizeResult {
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

export function tokenize(input: string): Token[] {
  const characters: string[] = input.split('');
  let index: number = 0;
  let tokens: Token[] = [];
  let buffer: string[] = [];
  let currentColumn: number = 2;
  let currentLine: number = 1;

  while (index < characters.length) {
    let currentCharacter = characters[index];

    if (isQuote(currentCharacter)) {
      let stringTokenizeResult = tokenizeStringLiteral({ characters, column: currentColumn, line: currentLine, index });
      currentColumn = stringTokenizeResult.column;
      index = stringTokenizeResult.index;
      tokens.push(stringTokenizeResult.token);
    } else if (isLetter(currentCharacter) || isNumber(currentCharacter)) {
      buffer.push(currentCharacter);
    } else if (isStickyOperator(currentCharacter)) {
      let nextCharacter = characters[index + 1];
      let operatorColumn = currentColumn;
      let operatorLiteral;

      if (isStickyOperator(nextCharacter) && isValidStickyOperator(currentCharacter, nextCharacter)) {
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
