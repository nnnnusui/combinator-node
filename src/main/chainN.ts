import { Combinator } from "../main";
import { chain } from "./chain";
import { convert } from "./convert";
import {
  AnyCombinators,
  Combinators,
  ContextFrom,
  Tupled,
} from "./type/Combinators";

export const chainN = <T extends AnyCombinators>(
  ...combinators: T
): Combinator<ContextFrom<T>, Tupled<T>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const it = (combinators: Combinators<ContextFrom<T>>): any => {
    if (combinators.length <= 1) return combinators[0];
    const [head, ...tails] = combinators;
    return convert(chain(head, it(tails)), (head, tails) => [head, ...tails]);
  };
  return it(combinators);
};
