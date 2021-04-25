/* eslint-disable @typescript-eslint/no-explicit-any */
import { Combinator } from "../main";
import { or } from "./or";
import { Combinators, Unified } from "./type/Combinators";

export const orN = <Context, T extends Combinators<Context>>(
  ...combinators: T
): Combinator<Context, Unified<T>> => {
  const it = (combinators: Combinators<Context>): any => {
    const [head, ...tails] = combinators;
    if (!tails) return head;
    return or(head, it(tails));
  };
  return it(combinators);
};
