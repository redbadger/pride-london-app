// @flow
import type { Client } from "bugsnag-react-native";
import type { Dispatch } from "redux";
import type { State } from "../reducers";

// eslint-disable-next-line import/prefer-default-export
export const notifyReporter = (error: Error) => (
  _: Dispatch<>,
  __: () => State,
  errorReporter: Client
) => errorReporter.notify(error);
