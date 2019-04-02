import { Object, ObjectKind } from './evaluator/types';

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

let input: string[] = [];

let cli = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

cli.on('line', line => {
  let command = input.join('');

  if (line !== '') return input.push(line);

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
      cli.prompt();
  }
}).on('close', () => {
  process.stdout.write('Exiting monkey-lang REPL...\n');
  process.exit(0);
});

function print(command: string): void {
  let env = createEnvironment();
  let program = parse(tokenize(command));

  if (program.errors.length) {
    program.errors.forEach(error => {
      process.stdout.write(error.message);
    });
  }

  let result = evaluate(program, env);
  if (result) {
    write(result);
  }
}

function write(result: Object): boolean | void {
  switch (result.kind) {
    case ObjectKind.Array:
      let elements = result.value as Object[];
      let values = elements.map(element => element.value).join(', ');
      return process.stdout.write(`[${values}]\n`);
    case ObjectKind.Puts:
      let objects = result.value as Object[];
      return objects.forEach(object => process.stdout.write(`${object.value}\n`));
    case ObjectKind.Null:
      return process.stdout.write('null\n');
    default:
      process.stdout.write(`${result.value}\n`);
  }
}
