/* eslint-disable @typescript-eslint/no-explicit-any */
import { Combinator } from "../main";
import { chain } from "./chain";
import { Combinators, Tupled } from "./type/Combinators";

export const chainN = <Context, T extends Combinators<Context>>(
  ...combinators: T
): Combinator<Context, Tupled<T>> => {
  const it = (combinators: Combinators<Context>): any => {
    const [head, ...tails] = combinators;
    if (!tails) return head;
    return chain(head, it(tails));
  };
  return it(combinators);
};
