import { Combinator } from "../main";
import { chainN } from "./chainN";
import { convert } from "./convert";
import { Combinators, ContextFrom, Last, Tupled } from "./type/Combinators";

export const chainR = <T extends Combinators<any>>(
  ...combinators: T
): Combinator<ContextFrom<T>, Last<Tupled<T>>> =>
  convert(chainN(...combinators), (it) => it.slice(-1)[0]);
