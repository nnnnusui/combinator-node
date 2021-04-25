/* eslint-disable @typescript-eslint/no-explicit-any */
import { Combinator } from "../main";
import { chain } from "./chain";
import { Combinators, ContextFrom, Tupled } from "./type/Combinators";

export const chainN = <T extends Combinators<any>>(
  ...combinators: T
): Combinator<ContextFrom<T>, Tupled<T>> => {
  const it = (combinators: Combinators<ContextFrom<T>>): any => {
    const [head, ...tails] = combinators;
    if (!tails) return head;
    return chain(head, it(tails));
  };
  return it(combinators);
};
