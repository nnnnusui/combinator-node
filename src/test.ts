import { chainN } from "./main/chainN";
import { Combinator } from "./main/type/Combinator";

type Parser = Combinator<string, string>;
const any: Parser = (context) => {
  const [head, ...tails] = context;
  console.log(tails);
  return Combinator.ok(tails.join(""), head);
};
const test = chainN(any, any, any);
console.dir(test("abcde"), {
  depth: Number.MAX_VALUE,
});
