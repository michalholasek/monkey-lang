/* tslint:disable:no-console */

import { createInterface } from 'readline';

import { createEnvironment, evaluate } from './evaluator';
import { tokenize } from './lexer';
import { parse } from './parser';

import { print } from './common';

let env = createEnvironment();

let cli = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

cli.on('line', line => {
  let input = line.trim();

  switch (input) {
    case 'quit':
    case 'q':
      cli.close();
      break;
    default:
      let program = parse(tokenize(line));

      if (program.errors.length) {
        program.errors.forEach(error => {
          console.log(error.message);
        });
      }

      let result = evaluate(program, env);
      if (result) {
        print(result);
      }

      cli.prompt();
  }
}).on('close', () => {
  console.log('Exiting monkey-lang REPL...');
  process.exit(0);
});

export default {
  run() {
    cli.prompt();
  }
};
