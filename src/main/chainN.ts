/* eslint-disable @typescript-eslint/no-explicit-any */
import { Combinator } from "../main";
import { chain } from "./chain";
import { convert } from "./convert";
import { Combinators, ContextFrom, Tupled } from "./type/Combinators";

export const chainN = <T extends Combinators<any>>(
  ...combinators: T
): Combinator<ContextFrom<T>, Tupled<T>> => {
  const it = (combinators: Combinators<ContextFrom<T>>): any => {
    const [head, ...tails] = combinators;
    if (tails.length <= 0) return head;
    return convert(chain(head, it(tails)), (head, tails) => [head, ...tails]);
  };
  return it(combinators);
};
