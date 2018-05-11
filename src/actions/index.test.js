// @flow
import { INIT, init } from "./";

describe("init", () => {
  it("creates an INIT event", async () => {
    const action = init();

    expect(action).toEqual({
      type: INIT
    });
  });
});
