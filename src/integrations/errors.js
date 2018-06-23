// @flow
import { ERROR } from "../actions/error";
import type { MiddlewareActions } from "../actions";

type Reporter = {
  notify: Error => void
};

const reportEvent = (action: MiddlewareActions, reporter) => {
  switch (action.type) {
    case ERROR:
      reporter.notify(action.payload);
      break;
    default:
      break;
  }
};

const errors = (errorReporter: Reporter) => () => (
  next: MiddlewareActions => mixed
) => (action: MiddlewareActions) => {
  reportEvent(action, errorReporter);
  return next(action);
};

export default errors;
