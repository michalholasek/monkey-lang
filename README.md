# monkey-lang

[![CircleCI](https://circleci.com/gh/michalholasek/monkey-lang.svg?style=shield)](https://circleci.com/gh/michalholasek/monkey-lang)

A [TypeScript](http://www.typescriptlang.org/) implementation of C-like language based on
excellent [Writing An Interpreter In Go](https://interpreterbook.com/) book.

## How To Install
0. Download and install [Node](https://nodejs.org/en/download/)
1. Open Terminal
2. `$ git clone https://github.com/michalholasek/monkey-lang.git`
3. `$ npm i && npm run build`

## How To Run
1. Open Terminal
2. `$ cd <monkey-lang directory>`
2. `$ node ./dist/monkey.js`

## REPL
```
Welcome to monkey-lang REPL!
Hit RETURN once to enter multiline editing, twice to enter your command.
> 5
5
> let let = 5;
invalid token(6, 1): expected Identifier, got Let instead
> quit
Exiting monkey-lang REPL...
```

## Features
- C-like syntax
- Integer, boolean, and string primitive data types
- Array and hashtable support
- Variable bindings
- Let and Return statements
- If-Else conditionals
- Basic arithmetic for integer expressions
- First class and higher-order functions, closures
- Built-in utility functions

### Types
| Type     | Examples                    |
|----------| ----------------------------|
|`int`     | `0`, `123`,  `-29`          |
|`boolean` | `true`, `false`             |
|`string`  | `"Astralis"`                |
|`array`   | `[]`, `[1, 2, 3]`, `[fn (x) { return x; }, [], ""]` |
|`hash`    | `{}`, `{ "key": "value" }`, `{ false: true, 1: "Yes!" }` |

### Variable Bindings
```
> let five = 5;
> five
5
```

### Integer Arithmetics
```
> let ten = 5 + 10 - 5;
> let eleven = (5 * 2) + 1;
> ten
10
> eleven
11
```

### Let and Return Statements
```
> let identity = fn(value) { return value };
> identity(42);
42
```

### Functions
```
> let add = fn(x) {
    return fn(y) {
      return x + y;
    }
  };
> let addTwo = add(2);
> addTwo(5);
7
```

### If-Else Conditionals
```
> let elsy = fn(value) {
    if (value) {
      return value;
    } else {
      return "Alternative.";
    }
  };
> elsy(false);
Alternative.
```

### Built-in Functions
```
> len("abc")
3
> len([1])
1

> push([1], 2, 3)
[1, 2, 3]

> first([1, 2, 3])
1

> last([1, 2, 3])
3

> rest([1, 2, 3])
[2, 3]

> puts(1, 2, 3)
1
2
3
> puts("Hello!")
"Hello!"
```

## License
MIT
