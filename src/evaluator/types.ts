export enum ObjectKind {
  Boolean = 'BOOLEAN',
  Integer = 'INTEGER',
  Null = 'NULL'
}

export type Object = Integer | Boolean | Null;

export interface Boolean {
  kind: ObjectKind;
  value: boolean;
}

export interface Integer {
  kind: ObjectKind;
  value: number;
}

export interface Null {
  kind: ObjectKind;
}
