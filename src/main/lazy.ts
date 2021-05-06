import { Combinator } from "./type/Combinator";

const lazy = <Context, T>(
  getCombinator: () => Combinator<Context, T>
): Combinator<Context, T> => {
  let mayBeCombinator: Combinator<Context, T> | null;
  return (context) => {
    if (!mayBeCombinator) mayBeCombinator = getCombinator();
    return mayBeCombinator(context);
  };
};
export default lazy;
