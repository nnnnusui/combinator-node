import { Combinator } from "../main";
import { or } from "./or";
import {
  AnyCombinators,
  Combinators,
  ContextFrom,
  Unified,
} from "./type/Combinators";

export const orN = <T extends AnyCombinators>(
  ...combinators: T
): Combinator<ContextFrom<T>, Unified<T>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const it = (combinators: Combinators<ContextFrom<T>>): any => {
    if (combinators.length <= 1) return combinators[0];
    const [head, ...tails] = combinators;
    return or(head, it(tails));
  };
  return it(combinators);
};
