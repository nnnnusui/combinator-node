/* eslint-disable @typescript-eslint/no-explicit-any */
import { Combinator } from "../main";
import { or } from "./or";
import { Combinators, ContextFrom, Unified } from "./type/Combinators";

export const orN = <T extends Combinators<any>>(
  ...combinators: T
): Combinator<ContextFrom<T>, Unified<T>> => {
  const it = (combinators: Combinators<ContextFrom<T>>): any => {
    const [head, ...tails] = combinators;
    if (tails.length <= 0) return head;
    return or(head, it(tails));
  };
  return it(combinators);
};
