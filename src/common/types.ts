export interface AssertionError {
  message: string;
}

export enum AssertionErrorKind {
  InvalidArgument = 'invalid argument',
  InvalidIdentifier = 'invalid identifier',
  InvalidToken = 'invalid token',
  UnexpectedToken = 'unexpected token',
  UnknownOperator = 'unknown operator'
}
