import { Combinator } from "../main";
import { chainN } from "./chainN";
import { convert } from "./convert";
import { AnyCombinators, ContextFrom, Tupled } from "./type/Combinators";

export const chainL = <T extends AnyCombinators>(
  ...combinators: T
): Combinator<ContextFrom<T>, Tupled<T>[0]> =>
  convert(chainN(...combinators), (it) => it[0]);
