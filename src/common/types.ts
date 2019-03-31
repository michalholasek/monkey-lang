export interface AssertionError {
  message: string;
}

export enum AssertionErrorKind {
  InvalidArgument = 'invalid argument',
  InvalidIdentifier = 'invalid identifier',
  InvalidIndex = 'invalid index',
  InvalidToken = 'invalid token',
  UnexpectedToken = 'unexpected token',
  UnknownOperator = 'unknown operator'
}
