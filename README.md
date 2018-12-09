# monkey-lang

A [TypeScript](http://www.typescriptlang.org/) implementation of C-like language based on
excellent [Writing An Interpreter In Go](https://interpreterbook.com/) book.

## How To Install
0. Download and install [Node](https://nodejs.org/en/download/)
1. Open Terminal
2. `$ git clone git@github.com:michalholasek/monkey-lang.git`
3. `$ npm i && npm run build`

## How To Run
1. Open Terminal
2. `$ node ./dist/monkey.js`

## REPL
```
Welcome to monkey-lang REPL!
> let value = 5;
[ { kind: 17, literal: 'let' },
  { kind: 2, literal: 'value' },
  { kind: 4, literal: '=' },
  { kind: 3, literal: '5' },
  { kind: 15, literal: ';' },
  { kind: 1, literal: '' } ]
> quit
Exiting monkey-lang REPL...
```

As you can see, REPL's only feature (for now) is running entered code through
[lexer](https://github.com/michalholasek/monkey-lang/blob/master/src/lexer/index.ts)
and printing resulting array of [tokens](https://github.com/michalholasek/monkey-lang/blob/master/src/types/token.ts).

## License
MIT
