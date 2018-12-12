import { tokenize } from '../../lexer';
import { parse } from '../index';

import { Statements } from './fixtures';

describe('Parser', () => {

  it('should return empty AST tree for empty array of tokens', () => {
    expect(parse([])).toMatchObject(Statements.Empty);
  });

  it('should parse given input correctly (let)', () => {
    const tokens = tokenize(`
      let x = 5;
      let y = 10;
      let foobar = 838383;
    `);
    const actual = parse(tokens);

    expect(actual).toMatchObject(Statements.Let);
  });

  it('should return an error for invalid statement (1)', () => {
    const actual = parse(tokenize('let let = 0;'));
    expect(actual).toMatchObject(Statements.Error.InvalidToken);
  });

});
