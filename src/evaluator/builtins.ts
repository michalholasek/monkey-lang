import { AssertionErrorKind } from '../common/types';
import { TokenKind } from '../lexer/types';
import { Expression } from '../parser/ast/types';
import { Object, ObjectKind } from './types';

import { createCustomAssertionError } from '../common';
import { createObject } from './helpers';

export const BuiltIns: { [key: string]: Object } = {
  first: {
    kind: ObjectKind.BuiltIn,
    fn: first
  },
  last: {
    kind: ObjectKind.BuiltIn,
    fn: last
  },
  len: {
    kind: ObjectKind.BuiltIn,
    fn: len
  },
  push: {
    kind: ObjectKind.BuiltIn,
    fn: push
  },
  puts: {
    kind: ObjectKind.BuiltIn,
    fn: puts
  },
  rest: {
    kind: ObjectKind.BuiltIn,
    fn: rest
  }
};

function first(expression: Expression, args: Object[] | undefined): Object {
  let nullObject = createObject(ObjectKind.Null);
  let argumentToken;

  if (!args || !args.length || args.length > 1) {
    argumentToken = expression.tokens[expression.tokens.length - 1];
    return createObject(
      ObjectKind.Error,
      createCustomAssertionError(
        AssertionErrorKind.InvalidArgument,
        'unexpected number of arguments',
        argumentToken.column,
        argumentToken.line
      ).message
    );
  }

  if (!Array.isArray(args[0].value)) {
    argumentToken = expression.tokens[2];
    return createObject(
      ObjectKind.Error,
      createCustomAssertionError(
        AssertionErrorKind.InvalidArgument,
        `expected Array, got ${TokenKind[argumentToken.kind]} instead`,
        argumentToken.column,
        argumentToken.line
      ).message
    );
  }

  let argument = args[0];

  if (argument.value) {
    let array = argument.value as Object[];
    return array.length ? array[0] : nullObject;
  }

  return nullObject;
}

function last(expression: Expression, args: Object[] | undefined): Object {
  let nullObject = createObject(ObjectKind.Null);
  let argumentToken;

  if (!args || !args.length || args.length > 1) {
    argumentToken = expression.tokens[expression.tokens.length - 1];
    return createObject(
      ObjectKind.Error,
      createCustomAssertionError(
        AssertionErrorKind.InvalidArgument,
        'unexpected number of arguments',
        argumentToken.column,
        argumentToken.line
      ).message
    );
  }

  if (!Array.isArray(args[0].value)) {
    argumentToken = expression.tokens[2];
    return createObject(
      ObjectKind.Error,
      createCustomAssertionError(
        AssertionErrorKind.InvalidArgument,
        `expected Array, got ${TokenKind[argumentToken.kind]} instead`,
        argumentToken.column,
        argumentToken.line
      ).message
    );
  }

  let argument = args[0];

  if (argument.value) {
    let array = argument.value as Object[];
    return array.length ? array[array.length - 1] : nullObject;
  }

  return nullObject;
}

function len(expression: Expression, args: Object[] | undefined): Object {
  let argumentToken;

  if (!args || !args.length || args.length > 1) {
    argumentToken = expression.tokens[expression.tokens.length - 1];
    return createObject(
      ObjectKind.Error,
      createCustomAssertionError(
        AssertionErrorKind.InvalidArgument,
        'unexpected number of arguments',
        argumentToken.column,
        argumentToken.line
      ).message
    );
  }

  if (typeof args[0].value !== 'string' && !Array.isArray(args[0].value)) {
    argumentToken = expression.tokens[2];
    return createObject(
      ObjectKind.Error,
      createCustomAssertionError(
        AssertionErrorKind.InvalidArgument,
        `expected String, got ${TokenKind[argumentToken.kind]} instead`,
        argumentToken.column,
        argumentToken.line
      ).message
    );
  }

  return createObject(ObjectKind.Integer, args[0].value.length);
}

function push(expression: Expression, args: Object[] | undefined): Object {
  let argumentToken;

  if (!args || !args.length || args.length !== 2) {
    argumentToken = expression.tokens[expression.tokens.length - 1];
    return createObject(
      ObjectKind.Error,
      createCustomAssertionError(
        AssertionErrorKind.InvalidArgument,
        'unexpected number of arguments',
        argumentToken.column,
        argumentToken.line
      ).message
    );
  }

  if (!Array.isArray(args[0].value)) {
    argumentToken = expression.tokens[2];
    return createObject(
      ObjectKind.Error,
      createCustomAssertionError(
        AssertionErrorKind.InvalidArgument,
        `expected Array, got ${TokenKind[argumentToken.kind]} instead`,
        argumentToken.column,
        argumentToken.line
      ).message
    );
  }

  let originalArray = args[0];
  let newElement = args[1];
  let array = originalArray.value as Object[];

  return createObject(ObjectKind.Array, array.concat([newElement]));
}

function puts(_: Expression, args: Object[] | undefined): Object {
  return createObject(ObjectKind.Puts, args);
}

function rest(expression: Expression, args: Object[] | undefined): Object {
  let nullObject = createObject(ObjectKind.Null);
  let argumentToken;

  if (!args || !args.length || args.length > 1) {
    argumentToken = expression.tokens[expression.tokens.length - 1];
    return createObject(
      ObjectKind.Error,
      createCustomAssertionError(
        AssertionErrorKind.InvalidArgument,
        'unexpected number of arguments',
        argumentToken.column,
        argumentToken.line
      ).message
    );
  }

  if (!Array.isArray(args[0].value)) {
    argumentToken = expression.tokens[2];
    return createObject(
      ObjectKind.Error,
      createCustomAssertionError(
        AssertionErrorKind.InvalidArgument,
        `expected Array, got ${TokenKind[argumentToken.kind]} instead`,
        argumentToken.column,
        argumentToken.line
      ).message
    );
  }

  let argument = args[0];

  if (argument.value) {
    let array = argument.value as Object[];
    return array.length ? createObject(ObjectKind.Array, array.slice(1)) : nullObject;
  }

  return nullObject;
}
