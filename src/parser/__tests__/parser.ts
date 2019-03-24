import { tokenize } from '../../lexer';
import { parse } from '../index';

import { Call } from './fixtures/expressions/call';
import { Function } from './fixtures/expressions/function';
import { Identifier } from './fixtures/expressions/identifier';
import { If } from './fixtures/expressions/if';
import { Infix } from './fixtures/expressions/infix';
import { Integer } from './fixtures/expressions/integer';
import { OperatorPrecedence } from './fixtures/expressions/precedences';
import { Prefix } from './fixtures/expressions/prefix';
import { String } from './fixtures/expressions/string';

import { Statements } from './fixtures/statements';

const Fixtures = Object.assign({}, {
  Expressions: {
    Call,
    Function,
    Identifier,
    If,
    Infix,
    Integer,
    OperatorPrecedence,
    Prefix,
    String
  },
  Statements
});

describe('Parser', () => {

  it('should return empty AST tree for empty array of tokens', () => {
    expect(parse([])).toMatchObject(Fixtures.Statements.Empty);
  });

  [
    'let let = 0;',
    'return ,;'
  ].forEach(expression => {
    it(`should return an error for invalid statement - ${expression}`, () => {
      const tokens = tokenize(expression);
      const actual = parse(tokens);

      expect(actual).toMatchObject(Fixtures.Statements.Error[expression]);
    });
  });

  it('should parse given input correctly (let)', () => {
    const tokens = tokenize(`
      let x = 5;
      let y = 10;
      let foobar = 838383;
    `);
    const actual = parse(tokens);

    expect(actual).toMatchObject(Fixtures.Statements.Let);
  });

  it('should parse given input correctly (return)', () => {
    const tokens = tokenize(`
      return 5;
      return 10;
      return 993322;
    `);
    const actual = parse(tokens);

    expect(actual).toMatchObject(Fixtures.Statements.Return);
  });

  it('should parse given input correctly (identifier expression)', () => {
    const tokens = tokenize('foobar;');
    const actual = parse(tokens);

    expect(actual).toMatchObject(Fixtures.Expressions.Identifier);
  });

  it('should parse given input correctly (integer expression)', () => {
    const tokens = tokenize('5;');
    const actual = parse(tokens);

    expect(actual).toMatchObject(Fixtures.Expressions.Integer);
  });

  [
    '!5;',
    '-15;',
    '!true;',
    '!false;'
  ].forEach(expression => {
    it(`should parse given prefix expression correctly - ${expression}`, () => {
      const tokens = tokenize(expression);
      const actual = parse(tokens);

      expect(actual).toMatchObject(Fixtures.Expressions.Prefix[expression]);
    });
  });

  [
    '5 + 5;',
    '5 - 5;',
    '5 * 5;',
    '5 / 5;',
    '5 > 5;',
    '5 < 5;',
    '5 == 5;',
    '5 != 5;',
    'true == true;',
    'true != false;',
    'false == false;'
  ].forEach(expression => {
    it(`should parse given infix expression correctly - ${expression}`, () => {
      const tokens = tokenize(expression);
      const actual = parse(tokens);

      expect(actual).toMatchObject(Fixtures.Expressions.Infix[expression]);
    });
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
    '3 < 5 == true;',
    '1 + (2 + 3) + 4;',
    '(5 + 5) * 2;',
    '2 / (5 + 5);',
    '-(5 + 5);',
    '!(true == true);',
    'a + add(b * c) + d',
    'add(a, b, 1, 2 * 3, 4 + 5, add(6, 7 * 8))',
    'add(a + b + c * d / f + g)'
  ].forEach(expression => {
    it(`should parse given operator precedences correctly - ${expression}`, () => {
      const tokens = tokenize(expression);
      const actual = parse(tokens);

      expect(actual).toMatchObject(Fixtures.Expressions.OperatorPrecedence[expression]);
    });
  });

  [
    'if (x < y) { x; }',
    'if (x < y) { x; } else { y; }'
  ].forEach(expression => {
    it(`should parse given if expression correctly - ${expression}`, () => {
      const tokens = tokenize(expression);
      const actual = parse(tokens);

      expect(actual).toMatchObject(Fixtures.Expressions.If[expression]);
    });
  });

  [
    'fn() { x + y; }',
    'fn(x, y) { x + y; }'
  ].forEach(expression => {
    it(`should parse given function expression correctly - ${expression}`, () => {
      const tokens = tokenize(expression);
      const actual = parse(tokens);

      expect(actual).toMatchObject(Fixtures.Expressions.Function[expression]);
    });
  });

  [
    'add(1, 2 * 3, 4 + 5);',
    'fn(x) { x; }(5);'
  ].forEach(expression => {
    it(`should parse given function call expression correctly - ${expression}`, () => {
      const tokens = tokenize(expression);
      const actual = parse(tokens);

      expect(actual).toMatchObject(Fixtures.Expressions.Call[expression]);
    });
  });

  [
    '"foo bar"'
  ].forEach(expression => {
    it(`should parse given string expression correctly - ${expression}`, () => {
      const tokens = tokenize(expression);
      const actual = parse(tokens);

      expect(actual).toMatchObject(Fixtures.Expressions.String[expression]);
    });
  });

});
