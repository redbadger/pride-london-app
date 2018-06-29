// @flow

// eslint-disable-next-line import/prefer-default-export
export const ERROR = "ERROR";

type ErrorActionType = "ERROR";

export type ErrorAction = { type: ErrorActionType, payload: Error };
