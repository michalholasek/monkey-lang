export interface AssertionError {
  message: string;
}

export enum AssertionErrorKind {
  InvalidToken = 'invalid token',
  UnexpectedToken = 'unexpected token',
  UnknownOperator = 'unknown operator'
}
