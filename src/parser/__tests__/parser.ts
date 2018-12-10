import lexer from '../../lexer';
import parser from '../index';

import { Statements } from './fixtures';


describe('Parser', () => {

  it('should parse given input correctly (let)', () => {
    const tokens = lexer(`
      let x = 5;
      let y = 10;
      let foobar = 838383;
    `);
    const actual = parser(tokens);

    expect(actual).toMatchObject(Statements.Let);
  });

});