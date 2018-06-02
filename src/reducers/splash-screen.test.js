// @flow
import SplashScreen from "react-native-splash-screen";
import reducer from "./splash-screen";

describe("Splash screen reducer", () => {
  it("hides splash screen on RECEIVE_CMS_DATA", () => {
    const data: any = null;
    reducer(undefined, {
      type: "RECEIVE_CMS_DATA",
      data
    });

    expect(SplashScreen.hide).toHaveBeenCalled();
  });
});

afterEach(() => {
  SplashScreen.hide.mockReset();
});
