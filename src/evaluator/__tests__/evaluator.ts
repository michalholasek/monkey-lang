import { tokenize } from '../../lexer';
import { parse } from '../../parser';

import { evaluate } from '../index';

import { Integer } from './fixtures';

const Fixtures = Object.assign({}, { Integer });

describe('Evaluator', () => {

  it('should evaluate given integer expression correctly', () => {
    let ast = parse(tokenize('5'));
    let actual = evaluate(ast);
    expect(actual).toMatchObject(Fixtures.Integer);
  });

});
