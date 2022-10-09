import { TokenKind } from '../../lexer/types';
import { NodeKind } from '../../parser/ast/types';
import { ObjectKind } from '../types';

import { createHash } from 'crypto';

export const Array = {
  '[]': {
    kind: ObjectKind.Array,
    value: []
  },
  '[1, 2 * 2, 3 + 3]': {
    kind: ObjectKind.Array,
    value: [
      {
        kind: ObjectKind.Integer,
        value: 1
      },
      {
        kind: ObjectKind.Integer,
        value: 4
      },
      {
        kind: ObjectKind.Integer,
        value: 6
      }
    ]
  },
  '[1, 2, 3][0]': {
    kind: ObjectKind.Integer,
    value: 1
  },
  '[1, 2, 3][1]': {
    kind: ObjectKind.Integer,
    value: 2
  },
  '[1, 2, 3][2]': {
    kind: ObjectKind.Integer,
    value: 3
  },
  'let i = 0; [1][i];': {
    kind: ObjectKind.Integer,
    value: 1
  },
  '[1, 2, 3][1 + 1];': {
    kind: ObjectKind.Integer,
    value: 3
  },
  'let myArray = [1, 2, 3]; myArray[2];': {
    kind: ObjectKind.Integer,
    value: 3
  },
  'let myArray = [1, 2, 3]; myArray[0] + myArray[1] + myArray[2];': {
    kind: ObjectKind.Integer,
    value: 6
  },
  'let myArray = [1, 2, 3]; let i = myArray[0]; myArray[i];': {
    kind: ObjectKind.Integer,
    value: 2
  },
  '[1, 2, 3][3]': {
    kind: ObjectKind.Null
  },
  '[1, 2, 3][-1]': {
    kind: ObjectKind.Null
  }
};

export const Boolean = {
  'true;': {
    kind: ObjectKind.Boolean,
    value: true
  },
  'false;': {
    kind: ObjectKind.Boolean,
    value: false
  },
  '1 < 2': {
    kind: ObjectKind.Boolean,
    value: true
  },
  '1 > 2': {
    kind: ObjectKind.Boolean,
    value: false
  },
  '1 < 1': {
    kind: ObjectKind.Boolean,
    value: false
  },
  '1 > 1': {
    kind: ObjectKind.Boolean,
    value: false
  },
  '1 == 1': {
    kind: ObjectKind.Boolean,
    value: true
  },
  '1 != 1': {
    kind: ObjectKind.Boolean,
    value: false
  },
  '1 == 2': {
    kind: ObjectKind.Boolean,
    value: false
  },
  '1 != 2': {
    kind: ObjectKind.Boolean,
    value: true
  },
  'true == true': {
    kind: ObjectKind.Boolean,
    value: true
  },
  'false == false': {
    kind: ObjectKind.Boolean,
    value: true
  },
  'true == false': {
    kind: ObjectKind.Boolean,
    value: false
  },
  'true != false': {
    kind: ObjectKind.Boolean,
    value: true
  },
  'false != true': {
    kind: ObjectKind.Boolean,
    value: true
  },
  '(1 < 2) == true': {
    kind: ObjectKind.Boolean,
    value: true
  },
  '(1 < 2) == false': {
    kind: ObjectKind.Boolean,
    value: false
  },
  '(1 > 2) == true': {
    kind: ObjectKind.Boolean,
    value: false
  },
  '(1 > 2) == false': {
    kind: ObjectKind.Boolean,
    value: true
  }
};

export const BuiltIn = {
  First: {
    'first();': {
      kind: ObjectKind.Error,
      value: 'invalid argument(8, 1): unexpected number of arguments'
    },
    'first("");': {
      kind: ObjectKind.Error,
      value: 'invalid argument(8, 1): expected Array, got String instead'
    },
    'first([]);': {
      kind: ObjectKind.Null
    },
    'first([1, 2, 3]);': {
      kind: ObjectKind.Integer,
      value: 1
    }
  },
  Last: {
    'last();': {
      kind: ObjectKind.Error,
      value: 'invalid argument(7, 1): unexpected number of arguments'
    },
    'last("");': {
      kind: ObjectKind.Error,
      value: 'invalid argument(7, 1): expected Array, got String instead'
    },
    'last([]);': {
      kind: ObjectKind.Null
    },
    'last([1, 2, 3]);': {
      kind: ObjectKind.Integer,
      value: 3
    }
  },
  Len: {
    'len("");': {
      kind: ObjectKind.Integer,
      value: 0
    },
    'len("four");': {
      kind: ObjectKind.Integer,
      value: 4
    },
    'len("hello world");': {
      kind: ObjectKind.Integer,
      value: 11
    },
    'len(1);': {
      kind: ObjectKind.Error,
      value: 'invalid argument(6, 1): expected String, got Int instead'
    },
    'len("one", "two");': {
      kind: ObjectKind.Error,
      value: 'invalid argument(18, 1): unexpected number of arguments'
    },
    'len([1, 2]);': {
      kind: ObjectKind.Integer,
      value: 2
    }
  },
  Push: {
    'push();': {
      kind: ObjectKind.Error,
      value: 'invalid argument(7, 1): unexpected number of arguments'
    },
    'push("", 1);': {
      kind: ObjectKind.Error,
      value: 'invalid argument(7, 1): expected Array, got String instead'
    },
    'push([]);': {
      kind: ObjectKind.Error,
      value: 'invalid argument(9, 1): unexpected number of arguments'
    },
    'push([1, 2], 3);': {
      kind: ObjectKind.Array,
      value: [
        {
          kind: ObjectKind.Integer,
          value: 1
        },
        {
          kind: ObjectKind.Integer,
          value: 2
        },
        {
          kind: ObjectKind.Integer,
          value: 3
        }
      ]
    }
  },
  Rest: {
    'rest();': {
      kind: ObjectKind.Error,
      value: 'invalid argument(7, 1): unexpected number of arguments'
    },
    'rest("");': {
      kind: ObjectKind.Error,
      value: 'invalid argument(7, 1): expected Array, got String instead'
    },
    'rest([]);': {
      kind: ObjectKind.Null
    },
    'rest([1, 2, 3]);': {
      kind: ObjectKind.Array,
      value: [
        {
          kind: ObjectKind.Integer,
          value: 2
        },
        {
          kind: ObjectKind.Integer,
          value: 3
        }
      ]
    }
  }
};

export const Call = {
  'fn(x) { x + 2; };': {
    kind: ObjectKind.Function,
    value: {
      body: {
        statements: [{
          expression: {
            left: {
              tokens: [{ column: 10, kind: TokenKind.Identifier, line: 1, literal: 'x' }],
              value: 'x'
            },
            operator: { column: 12, kind: TokenKind.Plus, line: 1, literal: '+' },
            right: {
              tokens: [{ column: 14, kind: TokenKind.Int, line: 1, literal: '2' }],
              value: 2
            },
            tokens: [
              { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'x' },
              { column: 12, kind: TokenKind.Plus, line: 1, literal: '+' },
              { column: 14, kind: TokenKind.Int, line: 1, literal: '2' }
            ]
          },
          kind: NodeKind.Expression,
          tokens: [
            { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'x' },
            { column: 12, kind: TokenKind.Plus, line: 1, literal: '+' },
            { column: 14, kind: TokenKind.Int, line: 1, literal: '2' }
          ]
        }],
        tokens: [
          { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'x' },
          { column: 12, kind: TokenKind.Plus, line: 1, literal: '+' },
          { column: 14, kind: TokenKind.Int, line: 1, literal: '2' },
          { column: 15, kind: TokenKind.Semicolon, line: 1, literal: ';' }
        ]
      },
      parameters: [
        { column: 5, kind: TokenKind.Identifier, line: 1, literal: 'x' }
      ],
      tokens: [
        { column: 2, kind: TokenKind.Function, line: 1, literal: 'fn' },
        { column: 4, kind: TokenKind.LeftParenthesis, line: 1, literal: '(' },
        { column: 5, kind: TokenKind.Identifier, line: 1, literal: 'x' },
        { column: 6, kind: TokenKind.RightParenthesis, line: 1, literal: ')' },
        { column: 8, kind: TokenKind.LeftBrace, line: 1, literal: '{' },
        { column: 10, kind: TokenKind.Identifier, line: 1, literal: 'x' },
        { column: 12, kind: TokenKind.Plus, line: 1, literal: '+' },
        { column: 14, kind: TokenKind.Int, line: 1, literal: '2' },
        { column: 15, kind: TokenKind.Semicolon, line: 1, literal: ';' },
        { column: 17, kind: TokenKind.RightBrace, line: 1, literal: '}' }
      ]
    }
  },
  'let identity = fn(x) { x; }; identity(5);': {
    kind: ObjectKind.Integer,
    value: 5
  },
  'let identity = fn(x) { return x; }; identity(5);': {
    kind: ObjectKind.Integer,
    value: 5
  },
  'let double = fn(x) { x * 2; }; double(5);': {
    kind: ObjectKind.Integer,
    value: 10
  },
  'let add = fn(x, y) { x + y; }; add(5, 5);': {
    kind: ObjectKind.Integer,
    value: 10
  },
  'let add = fn(x, y) { x + y; }; add(5 + 5, add(5, 5));': {
    kind: ObjectKind.Integer,
    value: 20
  },
  'fn(x) { x; }(5);': {
    kind: ObjectKind.Integer,
    value: 5
  },
  'let newAdder = fn(x) { fn(y) { x + y }; }; let addTwo = newAdder(2); addTwo(2);': {
    kind: ObjectKind.Integer,
    value: 4
  },
  'let x = 1; let add = fn() { let x = 2; x + 2; }; add();': {
    kind: ObjectKind.Integer,
    value: 4
  }
};

export const Hash = {
  'let two = "two"; { "one": 10 - 9, two: 1 + 1, "thr" + "ee": 6 / 2, 4: 4, true: 5, false: 6 };': {
    kind: ObjectKind.Hash,
    value: {
      keys: {
        [createHash('sha256').update('one').digest('hex')]: {
          kind: ObjectKind.String,
          value: 'one'
        },
        [createHash('sha256').update('two').digest('hex')]: {
          kind: ObjectKind.String,
          value: 'two'
        },
        [createHash('sha256').update('three').digest('hex')]: {
          kind: ObjectKind.String,
          value: 'three'
        },
        [createHash('sha256').update(Buffer.from([4])).digest('hex')]: {
          kind: ObjectKind.Integer,
          value: 4
        },
        [createHash('sha256').update('true').digest('hex')]: {
          kind: ObjectKind.Boolean,
          value: true
        },
        [createHash('sha256').update('false').digest('hex')]: {
          kind: ObjectKind.Boolean,
          value: false
        }
      },
      values: {
        [createHash('sha256').update('one').digest('hex')]: {
          kind: ObjectKind.Integer,
          value: 1
        },
        [createHash('sha256').update('two').digest('hex')]: {
          kind: ObjectKind.Integer,
          value: 2
        },
        [createHash('sha256').update('three').digest('hex')]: {
          kind: ObjectKind.Integer,
          value: 3
        },
        [createHash('sha256').update(Buffer.from([4])).digest('hex')]: {
          kind: ObjectKind.Integer,
          value: 4
        },
        [createHash('sha256').update('true').digest('hex')]: {
          kind: ObjectKind.Integer,
          value: 5
        },
        [createHash('sha256').update('false').digest('hex')]: {
          kind: ObjectKind.Integer,
          value: 6
        }
      }
    }
  },
  '{ "foo": 5 }["foo"]': {
    kind: ObjectKind.Integer,
    value: 5
  },
  '{ "foo": 5 }["bar"]': {
    kind: ObjectKind.Null
  },
  'let key = "foo"; { "foo": 5 }[key]': {
    kind: ObjectKind.Integer,
    value: 5
  },
  '{}["foo"]': {
    kind: ObjectKind.Null
  },
  '{ 5: 5 }[5]': {
    kind: ObjectKind.Integer,
    value: 5
  },
  '{ true: 5 }[true]': {
    kind: ObjectKind.Integer,
    value: 5
  },
  '{ false: 5 }[false]': {
    kind: ObjectKind.Integer,
    value: 5
  },
  '{ "name": "Monkey" }[fn(x) { x }];': {
    kind: ObjectKind.Error,
    value: 'invalid index(23, 1): got Function'
  }
};

export const IfElse = {
  'if (true) { 10 }': {
    kind: ObjectKind.Integer,
    value: 10
  },
  'if (false) { 10 }': {
    kind: ObjectKind.Null
  },
  'if (1) { 10 }': {
    kind: ObjectKind.Integer,
    value: 10
  },
  'if (1 < 2) { 10 }': {
    kind: ObjectKind.Integer,
    value: 10
  },
  'if (1 > 2) { 10 }': {
    kind: ObjectKind.Null
  },
  'if (1 > 2) { 10 } else { 20 }': {
    kind: ObjectKind.Integer,
    value: 20
  },
  'if (1 < 2) { 10 } else { 20 }': {
    kind: ObjectKind.Integer,
    value: 10
  }
};

export const Illegal = {
  '5 + true;': {
    kind: ObjectKind.Error,
    value: 'invalid token(6, 1): expected Int, got True instead'
  },
  '5 + true; 5;': {
    kind: ObjectKind.Error,
    value: 'invalid token(6, 1): expected Int, got True instead'
  },
  '-true;': {
    kind: ObjectKind.Error,
    value: 'invalid token(3, 1): expected Int, got True instead'
  },
  'true + false;': {
    kind: ObjectKind.Error,
    value: 'unknown operator(7, 1): Plus operator is invalid for True'
  },
  '5; true + false; 5': {
    kind: ObjectKind.Error,
    value: 'unknown operator(10, 1): Plus operator is invalid for True'
  },
  'if (10 > 1) { true + false; }': {
    kind: ObjectKind.Error,
    value: 'unknown operator(21, 1): Plus operator is invalid for True'
  },
  'foobar': {
    kind: ObjectKind.Error,
    value: 'invalid identifier(2, 1): foobar identifier not found'
  }
};

export const Integer = {
  '5': {
    kind: ObjectKind.Integer,
    value: 5
  },
  '-5': {
    kind: ObjectKind.Integer,
    value: -5
  },
  '5 + 5 + 5 + 5 - 10': {
    kind: ObjectKind.Integer,
    value: 10
  },
  '2 * 2 * 2 * 2 * 2': {
    kind: ObjectKind.Integer,
    value: 32
  },
  '-50 + 100 + -50': {
    kind: ObjectKind.Integer,
    value: 0
  },
  '5 * 2 + 10': {
    kind: ObjectKind.Integer,
    value: 20
  },
  '5 + 2 * 10': {
    kind: ObjectKind.Integer,
    value: 25
  },
  '20 + 2 * -10': {
    kind: ObjectKind.Integer,
    value: 0
  },
  '50 / 2 * 2 + 10': {
    kind: ObjectKind.Integer,
    value: 60
  },
  '2 * (5 + 10)': {
    kind: ObjectKind.Integer,
    value: 30
  },
  '3 * 3 * 3 + 10': {
    kind: ObjectKind.Integer,
    value: 37
  },
  '3 * (3 * 3) + 10': {
    kind: ObjectKind.Integer,
    value: 37
  },
  '(5 + 10 * 2 + 15 / 3) * 2 + -10': {
    kind: ObjectKind.Integer,
    value: 50
  }
};

export const Let = {
  'let a = 5; a;': {
    kind: ObjectKind.Integer,
    value: 5
  },
  'let a = 5 * 5; a;': {
    kind: ObjectKind.Integer,
    value: 25
  },
  'let a = 5; let b = a; b;': {
    kind: ObjectKind.Integer,
    value: 5
  },
  'let a = 5; let b = a; let c = a + b + 5; c;': {
    kind: ObjectKind.Integer,
    value: 15
  }
};

export const Prefix = {
  '!true;': {
    kind: ObjectKind.Boolean,
    value: false
  },
  '!false;': {
    kind: ObjectKind.Boolean,
    value: true
  },
  '!5;': {
    kind: ObjectKind.Boolean,
    value: false
  },
  '!!true;': {
    kind: ObjectKind.Boolean,
    value: true
  },
  '!!false;': {
    kind: ObjectKind.Boolean,
    value: false
  },
  '!!5;': {
    kind: ObjectKind.Boolean,
    value: true
  }
};

export const Return = {
  'return 10;': {
    kind: ObjectKind.Integer,
    value: 10
  },
  'return 10; 9;': {
    kind: ObjectKind.Integer,
    value: 10
  },
  'return 2 * 5; 9;': {
    kind: ObjectKind.Integer,
    value: 10
  },
  '9; return 2 * 5; 9;': {
    kind: ObjectKind.Integer,
    value: 10
  },
  'if (10 > 1) { if (10 > 1) { return 10; } return 1; }': {
    kind: ObjectKind.Integer,
    value: 10
  }
};

export const String = {
  '"foo bar"': {
    kind: ObjectKind.String,
    value: 'foo bar'
  },
  '"foo" + "bar"': {
    kind: ObjectKind.String,
    value: 'foobar'
  }
};
