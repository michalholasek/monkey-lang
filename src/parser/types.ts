import { Statement } from '../ast/types';

export interface StatementParseResult {
  node: Statement;
  tokenRangeStart: number;
  tokenRangeEnd: number;
}
