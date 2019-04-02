import { Token } from './types';

import {
  createToken,
  isLetter,
  isNewlineOrReturnCharacter,
  isNumber,
  isQuote,
  isStickyOperator,
  isWhiteSpace,
  tokenizeStickyOperatorLiteral,
  tokenizeStringLiteral
} from './helpers';

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
      let stringTokenizationResult = tokenizeStringLiteral({ characters, column: currentColumn, line: currentLine, index });
      currentColumn = stringTokenizationResult.column;
      index = stringTokenizationResult.index;
      tokens.push(stringTokenizationResult.token);
    } else if (isLetter(currentCharacter) || isNumber(currentCharacter)) {
      buffer.push(currentCharacter);
    } else if (isStickyOperator(currentCharacter)) {
      let operatorTokenizationResult = tokenizeStickyOperatorLiteral({ characters, column: currentColumn, line: currentLine, index });
      currentColumn = operatorTokenizationResult.column;
      index = operatorTokenizationResult.index;
      tokens.push(operatorTokenizationResult.token);
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
