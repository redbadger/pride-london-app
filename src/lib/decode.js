// @flow
import type { Maybe } from "./maybe";
import { some, none } from "./maybe";
import type { Result } from "./result";
import { ok, error, map as mapResult } from "./result";

// Decoders give you a way to safely convert from an unknown type to a
// concrete type and recover from failure at runtime.
// This is essentially a port of elm's JSON decoders
// http://package.elm-lang.org/packages/elm-lang/core/latest/Json-Decode
export type Decoder<A> = mixed => Result<string, A>;

export const succeed = <A>(v: A): Decoder<A> => () => ok(v);

export const boolean: Decoder<boolean> = (v: mixed) => {
  if (typeof v === "boolean") {
    return ok(v);
  }
  return error("value is not a boolean");
};

export const string: Decoder<string> = (v: mixed) => {
  if (typeof v === "string") {
    return ok(v);
  }
  return error("value is not a string");
};

export const number: Decoder<number> = (v: mixed) => {
  if (typeof v === "number") {
    return ok(v);
  }
  return error("value is not a number");
};

export const value = <A>(a: A): Decoder<A> => (v: mixed) => {
  if (v === a) {
    return ok(a);
  }
  return error("value is not equal");
};

export const maybe = <A>(decoder: Decoder<A>): Decoder<Maybe<A>> => (
  v: mixed
) => {
  if (v == null) {
    return ok(none());
  }
  return mapResult(some, decoder(v));
};

const arrayHelp = <A>(
  decoder: Decoder<A>
): ((Result<string, Array<A>>, mixed) => Result<string, Array<A>>) => (
  acc,
  item
) => {
  if (acc.ok) {
    const result: Result<string, A> = decoder(item);
    if (result.ok) {
      return ok([...acc.value, result.value]);
    }
    return result;
  }
  return acc;
};

export const array = <A>(decoder: Decoder<A>): Decoder<Array<A>> => (
  v: mixed
) => {
  if (Array.isArray(v)) {
    return v.reduce(arrayHelp(decoder), ok([]));
  }
  return error("value is not an array");
};

export const field = <A>(key: string, decoder: Decoder<A>): Decoder<A> => (
  v: mixed
) => {
  if (v != null && typeof v === "object") {
    return decoder(v[key]);
  }
  return error(`value is not an object`);
};

const atHelp = <A>(acc: Decoder<A>, key: string): Decoder<A> => field(key, acc);

export const at = <A>(keys: Array<string>, decoder: Decoder<A>): Decoder<A> =>
  keys.reduceRight(atHelp, decoder);

const shapeHelp = (obj, v) => (acc, k) => {
  if (acc.ok) {
    const result = obj[k](v);
    if (result.ok) {
      return ok(Object.assign(acc.value, { [k]: result.value }));
    }
    return result;
  }
  return acc;
};

type ShapeValueType = <A>(Decoder<A>) => A;

export const shape = <O: { [key: string]: * }>(
  obj: O
): Decoder<$ObjMap<O, ShapeValueType>> => (v: mixed) => {
  if (v != null && typeof v === "object") {
    return Object.keys(obj).reduce(shapeHelp(obj, v), ok({}));
  }
  return error("value is not an object");
};

export const oneOf = <A>([decoder, ...rest]: Array<Decoder<A>>): Decoder<A> => (
  v: mixed
) => {
  if (decoder) {
    const test = decoder(v);
    if (test.ok) {
      return test;
    }
    return oneOf(rest)(v);
  }
  return error("no decoders matched");
};

export const map = <A, B>(fn: (a: A) => B, decoder: Decoder<A>): Decoder<B> => (
  v: mixed
) => mapResult(fn, decoder(v));

const filterMapHelp = <A>(decoder: Decoder<A>) => (
  acc: Array<A>,
  item: mixed
): Array<A> => {
  const result: Result<string, A> = decoder(item);
  if (result.ok) {
    return [...acc, result.value];
  }
  return acc;
};

export const filterMap = <A>(decoder: Decoder<A>): Decoder<Array<A>> => (
  v: mixed
) => {
  if (Array.isArray(v)) {
    // I'm am confident this is typed correctly. I just can't seem to get
    // flow to understand it.
    // $FlowFixMe
    return ok(v.reduce(filterMapHelp(decoder), []));
  }
  return error("value is not an array");
};
