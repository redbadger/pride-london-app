// @flow
import reducer from "./splash-screen";

describe("Splash screen reducer", () => {
  it("starts hiding splash screen on RECEIVE_CMS_DATA", () => {
    const data: any = null;
    const newState = reducer("showing", {
      type: "RECEIVE_CMS_DATA",
      data
    });

    expect(newState).toBe("hiding");
  });

  it("hides splash screen on HIDE_SPLASH_SCREEN", () => {
    const data: any = null;
    const newState = reducer("hiding", {
      type: "HIDE_SPLASH_SCREEN",
      data
    });

    expect(newState).toBe("hidden");
  });
});
