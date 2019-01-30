/* tslint:disable:no-console */

import { createInterface } from 'readline';

import { evaluate } from './evaluator';
import { tokenize } from './lexer';
import { parse } from './parser';

const cli = createInterface({
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
      const program = parse(tokenize(line));

      if (program.errors.length) {
        program.errors.forEach(error => {
          console.log(error.message);
        });
      }

      const result = evaluate(program);
      if (result.value) {
        console.log(result.value);
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
