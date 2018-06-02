// @flow

// We might want to swap this out later for a generic result lib.
// perhaps one that follows the fantasy-land spec.
export type Result<X, A> = { ok: true, value: A } | { ok: false, error: X };

export const ok = <X, A>(v: A): Result<X, A> => ({ ok: true, value: v });

export const error = <X, A>(err: X): Result<X, A> => ({
  ok: false,
  error: err
});

export const map = <X, A, B>(
  fn: (a: A) => B,
  result: Result<X, A>
): Result<X, B> => {
  if (result.ok) {
    return ok(fn(result.value));
  }
  return result;
};

export const withDefault = <X, A>(value: A, result: Result<X, A>) => {
  if (result.ok) {
    return result.value;
  }
  return value;
};
