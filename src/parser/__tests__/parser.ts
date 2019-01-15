import { tokenize } from '../../lexer';
import { parse } from '../index';

import { Expressions, Statements } from './fixtures';

describe('Parser', () => {

  it('should return empty AST tree for empty array of tokens', () => {
    expect(parse([])).toMatchObject(Statements.Empty);
  });

  it('should return an error for invalid statement (1)', () => {
    const actual = parse(tokenize('let let = 0;'));
    expect(actual).toMatchObject(Statements.Error.InvalidToken);
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

  it('should parse given input correctly (return)', () => {
    const tokens = tokenize(`
      return 5;
      return 10;
      return 993322;
    `);
    const actual = parse(tokens);

    expect(actual).toMatchObject(Statements.Return);
  });

  it('should parse given input correctly (identifier expression)', () => {
    const tokens = tokenize('foobar;');
    const actual = parse(tokens);

    expect(actual).toMatchObject(Expressions.Identifier);
  });

  it('should parse given input correctly (integer expression)', () => {
    const tokens = tokenize('5;');
    const actual = parse(tokens);

    expect(actual).toMatchObject(Expressions.Integer);
  });

  [
    '!5;',
    '-15;',
    '!true;',
    '!false;'
  ].forEach(expression => {
    it(`should parse given input correctly - ${expression}`, () => {
      const tokens = tokenize(expression);
      const actual = parse(tokens);

      expect(actual).toMatchObject(Expressions.Prefix[expression]);
    });
  });

  it('should parse given input correctly (infix operators)', () => {
    const tokens = tokenize(`
      5 + 5;
      5 - 5;
      5 * 5;
      5 / 5;
      5 > 5;
      5 < 5;
      5 == 5;
      5 != 5;
    `);
    const actual = parse(tokens);

    expect(actual).toMatchObject(Expressions.Infix);
  });

  [
    '-a * b;',
    '!-a;',
    'a + b + c;',
    'a + b - c;',
    'a * b * c;',
    'a * b / c;',
    'a + b / c;',
    'a + b * c + d / e - f;',
    '5 > 4 == 3 < 4;',
    '5 < 4 != 3 > 4;',
    '3 + 4 * 5 == 3 * 1 + 4 * 5;',
    'true;',
    'false;',
    '3 > 5 == false;',
    '3 < 5 == true;'
  ].forEach(expression => {
    it(`should parse given input correctly - ${expression}`, () => {
      const tokens = tokenize(expression);
      const actual = parse(tokens);

      expect(actual).toMatchObject(Expressions.OperatorPrecedence[expression]);
    });
  });

});
