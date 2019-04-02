import { tokenize } from '../../lexer';
import { parse } from '../../parser';

import { createEnvironment } from '../helpers';
import { evaluate } from '../index';

import {
  Array,
  Boolean,
  BuiltIn,
  Call,
  Hash,
  IfElse,
  Illegal,
  Integer,
  Let,
  Prefix,
  Return,
  String
} from './fixtures';

const Fixtures = Object.assign({}, {
  Array,
  Boolean,
  BuiltIn,
  Call,
  Hash,
  IfElse,
  Illegal,
  Integer,
  Let,
  Prefix,
  Return,
  String
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
      let env = createEnvironment();
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast, env);
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
      let env = createEnvironment();
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast, env);
      expect(actual).toMatchObject(Fixtures.Boolean[expression]);
    });
  });

  [
    '"foo bar"',
    '"foo" + "bar"'
  ].forEach(expression => {
    it(`should evaluate given string expression correctly - ${expression}`, () => {
      let env = createEnvironment();
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast, env);
      expect(actual).toMatchObject(Fixtures.String[expression]);
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
      let env = createEnvironment();
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast, env);
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
      let env = createEnvironment();
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast, env);
      expect(actual).toMatchObject(Fixtures.IfElse[expression]);
    });
  });

  [
    'return 10;',
    'return 10; 9;',
    'return 2 * 5; 9;',
    '9; return 2 * 5; 9;',
    'if (10 > 1) { if (10 > 1) { return 10; } return 1; }'
  ].forEach(expression => {
    it(`should evaluate given return statement correctly - ${expression}`, () => {
      let env = createEnvironment();
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast, env);
      expect(actual).toMatchObject(Fixtures.Return[expression]);
    });
  });

  [
    '5 + true;',
    '5 + true; 5;',
    '-true;',
    'true + false;',
    '5; true + false; 5',
    'if (10 > 1) { true + false; }',
    'foobar'
  ].forEach(expression => {
    it(`should return error message for illegal expression - ${expression}`, () => {
      let env = createEnvironment();
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast, env);
      expect(actual).toMatchObject(Fixtures.Illegal[expression]);
    });
  });

  [
    'let a = 5; a;',
    'let a = 5 * 5; a;',
    'let a = 5; let b = a; b;',
    'let a = 5; let b = a; let c = a + b + 5; c;'
  ].forEach(expression => {
    it(`should evaluate given let statement correctly - ${expression}`, () => {
      let env = createEnvironment();
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast, env);
      expect(actual).toMatchObject(Fixtures.Let[expression]);
    });
  });

  [
    'fn(x) { x + 2; };',
    'let identity = fn(x) { x; }; identity(5);',
    'let identity = fn(x) { return x; }; identity(5);',
    'let double = fn(x) { x * 2; }; double(5);',
    'let add = fn(x, y) { x + y; }; add(5, 5);',
    'let add = fn(x, y) { x + y; }; add(5 + 5, add(5, 5));',
    'fn(x) { x; }(5);',
    'let newAdder = fn(x) { fn(y) { x + y }; }; let addTwo = newAdder(2); addTwo(2);'
  ].forEach(expression => {
    it(`should evaluate given function expression correctly - ${expression}`, () => {
      let env = createEnvironment();
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast, env);
      expect(actual).toMatchObject(Fixtures.Call[expression]);
    });
  });

  [
    { name: 'Len', expression: 'len("");' },
    { name: 'Len', expression: 'len("four");' },
    { name: 'Len', expression: 'len("hello world");' },
    { name: 'Len', expression: 'len(1);' },
    { name: 'Len', expression: 'len("one", "two");' },
    { name: 'Len', expression: 'len([1, 2]);' },
    { name: 'First', expression: 'first();' },
    { name: 'First', expression: 'first("");' },
    { name: 'First', expression: 'first([]);' },
    { name: 'First', expression: 'first([1, 2, 3]);' },
    { name: 'Last', expression: 'last();' },
    { name: 'Last', expression: 'last("");' },
    { name: 'Last', expression: 'last([]);' },
    { name: 'Last', expression: 'last([1, 2, 3]);' },
    { name: 'Rest', expression: 'rest();' },
    { name: 'Rest', expression: 'rest("");' },
    { name: 'Rest', expression: 'rest([]);' },
    { name: 'Rest', expression: 'rest([1, 2, 3]);' },
    { name: 'Push', expression: 'push();' },
    { name: 'Push', expression: 'push("", 1);' },
    { name: 'Push', expression: 'push([]);' },
    { name: 'Push', expression: 'push([1, 2], 3);' }
  ].forEach(({ name, expression })=> {
    it(`should evaluate given build-in expression correctly - ${expression}`, () => {
      let env = createEnvironment();
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast, env);
      expect(actual).toMatchObject(Fixtures.BuiltIn[name][expression]);
    });
  });

  [
    '[]',
    '[1, 2 * 2, 3 + 3]',
    '[1, 2, 3][0]',
    '[1, 2, 3][1]',
    '[1, 2, 3][2]',
    'let i = 0; [1][i];',
    '[1, 2, 3][1 + 1];',
    'let myArray = [1, 2, 3]; myArray[2];',
    'let myArray = [1, 2, 3]; myArray[0] + myArray[1] + myArray[2];',
    'let myArray = [1, 2, 3]; let i = myArray[0]; myArray[i];',
    '[1, 2, 3][3]',
    '[1, 2, 3][-1]'
  ].forEach(expression => {
    it(`should evaluate given array expression correctly - ${expression}`, () => {
      let env = createEnvironment();
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast, env);
      expect(actual).toMatchObject(Fixtures.Array[expression]);
    });
  });

  [
    'let two = "two"; { "one": 10 - 9, two: 1 + 1, "thr" + "ee": 6 / 2, 4: 4, true: 5, false: 6 };',
    '{ "foo": 5 }["foo"]',
    '{ "foo": 5 }["bar"]',
    'let key = "foo"; { "foo": 5 }[key]',
    '{}["foo"]',
    '{ 5: 5 }[5]',
    '{ true: 5 }[true]',
    '{ false: 5 }[false]',
    '{ "name": "Monkey" }[fn(x) { x }];'
  ].forEach(expression => {
    it(`should evaluate given hash expression correctly - ${expression}`, () => {
      let env = createEnvironment();
      let ast = parse(tokenize(expression));
      let actual = evaluate(ast, env);
      expect(actual).toMatchObject(Fixtures.Hash[expression]);
    });
  });

});
