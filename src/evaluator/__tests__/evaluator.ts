import { tokenize } from '../../lexer';
import { parse } from '../../parser';

import { evaluate } from '../index';

import { Boolean, Integer, Prefix } from './fixtures';

const Fixtures = Object.assign({}, {
  Boolean,
  Integer,
  Prefix
});

describe('Evaluator', () => {

  it('should evaluate given integer expression correctly', () => {
    let ast = parse(tokenize('5'));
    let actual = evaluate(ast);
    expect(actual).toMatchObject(Fixtures.Integer);
  });

  ['true;', 'false;'].forEach(expression => {
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

});
