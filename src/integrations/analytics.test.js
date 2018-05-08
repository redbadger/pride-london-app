import analytics from "./analytics";
import { init } from "../actions";

describe("analytics middleware", () => {
  it("behaves like a redux middleware", () => {
    const mockNext = jest.fn();
    const action = init();

    analytics()(mockNext)(action);

    expect(mockNext).toBeCalledWith(action);
  });
});
