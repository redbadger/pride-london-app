// @flow

// Helper for calling out flows "maybe" type (a nullable value)
export type Maybe<A> = ?A;

export const some = <A>(v: A): Maybe<A> => v;

export const none = <A>(): Maybe<A> => null;

export const withDefault = <A>(defaultValue: A): ((Maybe<A>) => A) => value => {
  if (value == null) {
    return defaultValue;
  }
  return value;
};
