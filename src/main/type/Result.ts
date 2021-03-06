type Result<Err, Ok> =
  | {
      ok: false;
      get: Err;
    }
  | {
      ok: true;
      get: Ok;
    };

// eslint-disable-next-line @typescript-eslint/naming-convention
const Result = {
  ok: <Err, Ok>(value: Ok): Result<Err, Ok> =>
    ({ ok: true, get: value } as const),
  err: <Err, Ok>(value: Err): Result<Err, Ok> =>
    ({ ok: false, get: value } as const),
};

export default Result;
