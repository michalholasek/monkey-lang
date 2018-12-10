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

## Parsing
- A **parser** turns its input into a **data structure** that represents the input
- The data structure used for the internal representation is called **abstract
  syntax tree** (AST for short)
  * There is not one true, universal AST format that’s used by every parser. Their
    implementations are all pretty similar, the concept is the same, but they
    differ in details. The concrete implementation depends on the programming
    language being parsed
- While building up the data structure, parsers analyse the input, checking
  that it conforms to the expected structure. The process of parsing is also
  called *syntactic analysis*
- There are two main strategies when parsing a programming language: **top-down**
  parsing or **bottom-up** parsing
  * The former starts with constructing root node of the AST and then descends
    while the latter does it the other way around
