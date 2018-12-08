import Keywords from '../types/keywords';
import { TokenKind } from '../types/token';

const KEYWORDS : Keywords = {
  let: TokenKind.Let,
  fn: TokenKind.Function
};

export default KEYWORDS;
