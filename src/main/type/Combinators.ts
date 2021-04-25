/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Combinator } from "./Combinator";

export type Combinators<T> = Combinator<T, any>[];
type OkFrom<T> = T extends Combinator<any, infer T> ? T : never;
export type Tupled<T extends Combinators<any>> = OkFrom<T[number]>;
export type Unified<T extends Combinators<any>> = {
  [Key in keyof T]: OkFrom<T[Key]>;
};
