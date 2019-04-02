import { HashLiteral, Object, ObjectKind } from './evaluator/types';

import { createInterface } from 'readline';

import { createEnvironment, evaluate } from './evaluator';
import { tokenize } from './lexer';
import { parse } from './parser';

export default {
  run() {
    process.stdout.write('Welcome to monkey-lang REPL!\n');
    cli.prompt();
  }
};

let env = createEnvironment();
let input: string[] = [];

let cli = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

function stringify(result: Object): string {
  switch (result.kind) {
    case ObjectKind.Array:
      let elements = result.value as Object[];
      return `[${elements.map(element => element.value).join(', ')}]\n`;
    case ObjectKind.Hash:
      let pairs = result.value as HashLiteral;
      return `{ ${Object.keys(pairs.keys)
        .map(key => `${pairs.keys[key].value}: ${pairs.values[key].value}`)
        .join(', ')
      } }\n`;
    case ObjectKind.Puts:
      let objects = result.value as Object[];
      return objects.map(object => `${object.value}\n`).join('');
    case ObjectKind.Null:
      return 'null\n';
    default:
      return `${result.value}\n`;
  }
}

function print(command: string): void {
  let program = parse(tokenize(command));

  if (program.errors.length) {
    program.errors.forEach(error => {
      process.stdout.write(error.message);
    });
  }

  let result = evaluate(program, env);
  if (result) {
    process.stdout.write(stringify(result));
  }
}

cli.on('line', line => {
  let command = input.join('');

  if (line !== '') {
    input.push(line);
    cli.setPrompt('');
    cli.prompt();
    return;
  }

  // Move cursor one line up
  process.stdout.write('\x1b[1A');

  switch (command) {
    case 'quit':
    case 'q':
      cli.close();
      break;
    default:
      print(command);
      input = [];
      cli.setPrompt('> ');
      cli.prompt();
  }
}).on('close', () => {
  process.stdout.write('Exiting monkey-lang REPL...\n');
  process.exit(0);
});
