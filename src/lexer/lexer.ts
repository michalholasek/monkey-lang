import { Token, TokenKind } from '../types/token';

function createToken(literal : string) : Token {
  let token : Token = { kind: TokenKind.Illegal , literal };

  switch (literal) {
    case '=':
      token.kind = TokenKind.Assign;
      break;
    case '+':
      token.kind = TokenKind.Plus;
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
      token.kind = TokenKind.Illegal;
  }

  return token;
}

export default function (input : string) : Token[] {
  const characters : string[] = input.split('');
  let index : number = 0;
  let tokens : Token[] = [];

  while (index < characters.length) {
    tokens.push(createToken(characters[index]));
    index++;
  }

  // Create EOF token
  tokens.push(createToken(''));

  return tokens;
}
