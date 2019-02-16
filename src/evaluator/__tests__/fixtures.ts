import { ObjectKind } from '../types';

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
