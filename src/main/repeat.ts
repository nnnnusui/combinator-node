import { Combinator, OnError } from "./type/Combinator";

const checkArgumentsState = (must: number, to: number) => {
  if (to < 1) {
    throw new Error(
      `This repeat() always fails. { to: ${to} } Must be greater than 1.`
    );
  }
  if (to < must) {
    throw new Error(
      `This repeat() always fails. { to: ${to} } Must be greater than { must: ${must} }.`
    );
  }
};

export const repeat = <Context, T>(
  combinator: Combinator<Context, T>,
  must = 1,
  to?: number
): Combinator<Context, T[]> => {
  if (to !== undefined) checkArgumentsState(must, to);

  const recursion = (
    context: Context,
    results: T[]
  ): [Context, T[], OnError<Context>?] => {
    if (to && to <= results.length) return [context, results];
    const result = combinator(context);
    if (!result.ok) return [context, results, result.get];
    return recursion(result.context, [...results, result.get]);
  };
  return (context) => {
    const [afterContext, result, error] = recursion(context, []);
    if (result.length < must) {
      return Combinator.err<Context, T[]>(
        context,
        `repeat(): Must be repeated ${must} times or more.`,
        error ? [error] : []
      );
    }
    return Combinator.ok(afterContext, result);
  };
};
