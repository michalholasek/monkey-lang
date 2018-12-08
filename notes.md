# Writing an Interpreter in Go Notes

## Lexing

- The transformation of source code to tokens is called **lexical analysis**
  or **lexing**
- Done by **lexer**, also called **tokenizer** or **scanner**
- Tokens are then fed to the **parser**, which then transforms them to **Abstract
  Syntax Tree**

```
Source Code -> Lexer -> Abstract Syntax Tree
```
