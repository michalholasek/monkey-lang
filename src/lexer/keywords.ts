import Keywords from '../types/keywords';
import { TokenKind } from '../types/token';

const KEYWORDS : Keywords = {
  else: TokenKind.Else,
  false: TokenKind.False,
  fn: TokenKind.Function,
  if: TokenKind.If,
  let: TokenKind.Let,
  return: TokenKind.Return,
  true: TokenKind.True
};

export default KEYWORDS;
