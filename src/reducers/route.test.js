// @flow
import reducer from "./route";

describe("Router reducer", () => {
  it("initialises with default state", () => {
    // $FlowFixMe
    const state = reducer(undefined, {});

    expect(state).toMatchSnapshot();
  });

  describe("NAVIGATION action", () => {
    it("stores the current route", () => {
      const state = reducer("", {
        type: "NAVIGATION",
        route: "somewhere"
      });

      expect(state).toMatchSnapshot();
    });
  });
});
