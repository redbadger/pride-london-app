// @flow
export type StandardAction<A, P> = {|
  type: A,
  payload?: P
|};

type InitActionType = "INIT";

export const INIT = "INIT";

export type InitAction = { type: InitActionType };

export const init = () => ({
  type: INIT
});
