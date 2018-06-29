// @flow
import errors from "./errors";
import { ERROR } from "../actions/error";

describe("errors middleware", () => {
  it("behaves like a redux middleware", () => {
    const mockNext = jest.fn();
    const action = { type: "SOME_ACTION" };
    errors({ notify: () => {} })()(mockNext)(action);
    expect(mockNext).toBeCalledWith(action);
  });

  it("reports events for ERROR actions", () => {
    const mockNext = jest.fn();
    const error = new Error();
    const action = { type: ERROR, payload: error };
    const mockReporter = { notify: jest.fn() };
    errors(mockReporter)()(mockNext)(action);
    expect(mockReporter.notify).toBeCalledWith(error);
  });
});
