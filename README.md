# monkey-lang

[![CircleCI](https://circleci.com/gh/michalholasek/monkey-lang.svg?style=shield)](https://circleci.com/gh/michalholasek/monkey-lang)

A [TypeScript](http://www.typescriptlang.org/) implementation of C-like language based on
excellent [Writing An Interpreter In Go](https://interpreterbook.com/) book.

## How To Install
0. Download and install [Node](https://nodejs.org/en/download/)
1. Open Terminal
2. `$ git clone git@github.com:michalholasek/monkey-lang.git`
3. `$ npm i && npm run build`

## How To Run
1. Open Terminal
2. `$ cd <monkey-lang directory>`
2. `$ node ./dist/monkey.js`

## REPL
```
Welcome to monkey-lang REPL!
> 5
5
> let let = 5;
invalid token(6, 1): expected Identifier, got Let instead
> quit
Exiting monkey-lang REPL...
```

At the moment, REPL has only two features - integer and boolean expression
evaluation, and simple statement assertions.

## License
MIT
