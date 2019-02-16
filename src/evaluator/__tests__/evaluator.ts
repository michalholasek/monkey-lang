import { tokenize } from '../../lexer';
import { parse } from '../../parser';

import { evaluate } from '../index';

import { Boolean, IfElse, Integer, Prefix } from './fixtures';

const Fixtures = Object.assign({}, {
  Boolean,
  IfElse,
  Integer,
  Prefix
});

describe('Evaluator', () => {

  [
    '5',
    '-5',
    '5 + 5 + 5 + 5 - 10',
    '2 * 2 * 2 * 2 * 2',
    '-50 + 100 + -50',
    '5 * 2 + 10',
    '5 + 2 * 10',
    '20 + 2 * -10',
    '50 / 2 * 2 + 10',
    '2 * (5 + 10)',
    '3 * 3 * 3 + 10',
    '3 * (3 * 3) + 10',
    '(5 + 10 * 2 + 15 / 3) * 2 + -10'
  ].forEach(expression => {
    it(`should evaluate given integer expression correctly - ${expression}`, () => {
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast);
      expect(actual).toMatchObject(Fixtures.Integer[expression]);
    });
  });

  [
    'true;',
    'false;',
    '1 < 2',
    '1 > 2',
    '1 < 1',
    '1 > 1',
    '1 == 1',
    '1 != 1',
    '1 == 2',
    '1 != 2',
    'true == true',
    'false == false',
    'true == false',
    'true != false',
    'false != true',
    '(1 < 2) == true',
    '(1 < 2) == false',
    '(1 > 2) == true',
    '(1 > 2) == false'
  ].forEach(expression => {
    it(`should evaluate given boolean expression correctly - ${expression}`, () => {
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast);
      expect(actual).toMatchObject(Fixtures.Boolean[expression]);
    });
  });

  [
    '!true;',
    '!false;',
    '!5;',
    '!!true;',
    '!!false;',
    '!!5;'
  ].forEach(expression => {
    it(`should evaluate given prefix expression correctly - ${expression}`, () => {
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast);
      expect(actual).toMatchObject(Fixtures.Prefix[expression]);
    });
  });

  [
    'if (true) { 10 }',
    'if (false) { 10 }',
    'if (1) { 10 }',
    'if (1 < 2) { 10 }',
    'if (1 > 2) { 10 }',
    'if (1 > 2) { 10 } else { 20 }',
    'if (1 < 2) { 10 } else { 20 }'
  ].forEach(expression => {
    it(`should evaluate given if-else expression correctly - ${expression}`, () => {
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast);
      expect(actual).toMatchObject(Fixtures.IfElse[expression]);
    });
  });

});
