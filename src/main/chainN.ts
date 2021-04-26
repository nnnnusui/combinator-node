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
  const it = (
    combinators: Combinators<ContextFrom<T>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Combinator<ContextFrom<T>, any> => {
    const [head, ...tails] = combinators;
    if (tails.length < 1) return head;
    return convert(chain(head, it(tails)), ([head, tails]) => [head, ...tails]);
  };
  return it(combinators);
};
