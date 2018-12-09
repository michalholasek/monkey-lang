import { TokenKind } from './token';

export default interface Keywords {
  [index : string] : TokenKind;
}
