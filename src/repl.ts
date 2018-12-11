/* tslint:disable:no-console */

import { createInterface } from 'readline';
import { tokenize } from './lexer';

const cli = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

cli.on('line', (line) => {
  const input = line.trim();

  switch (input) {
    case 'quit':
    case 'q':
      cli.close();
      break;
    default:
      const tokens = tokenize(line);
      console.log(tokens);
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
