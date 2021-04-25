import Result from "./Result";

export type OnError<Context> = {
  on: Context;
  message: string;
  by: OnError<Context>[];
};
type CombinatorResult<Context, Ok> = Result<OnError<Context>, Ok> & {
  context: Context;
};
type Combinator<Context, Ok> = (
  context: Context
) => CombinatorResult<Context, Ok>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const Combinator = {
  ok: <Context, Ok>(
    context: Context,
    head: Ok
  ): CombinatorResult<Context, Ok> => ({ ...Result.ok(head), context }),
  err: <Context, Ok>(
    context: Context,
    message: string,
    by = [] as OnError<Context>[]
  ): CombinatorResult<Context, Ok> => ({
    ...Result.err({ message, on: context, by }),
    context,
  }),
};

export { Combinator };
