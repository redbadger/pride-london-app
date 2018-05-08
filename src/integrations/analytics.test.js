// @flow
import { NativeModules } from "react-native";
import analytics from "./analytics";
import { init } from "../actions";
import { NAVIGATION } from "../actions/navigation";
import { HOME } from "../constants/routes";

jest.mock("react-native", () => ({
  NativeModules: {
    Analytics: {
      trackEvent: jest.fn()
    }
  }
}));

describe("analytics middleware", () => {
  it("behaves like a redux middleware", () => {
    const mockNext = jest.fn();
    const action = init();
    analytics()(mockNext)(action);
    expect(mockNext).toBeCalledWith(action);
  });

  it("tracks events for NAVIGATION actions", () => {
    const mockNext = jest.fn();
    const action = { type: NAVIGATION, route: "Test" };
    analytics()(mockNext)(action);
    expect(NativeModules.Analytics.trackEvent).toBeCalledWith("Screen Event", {
      screen: "Test"
    });
  });

  it("tracks event for INIT action as HOME screen", () => {
    const mockNext = jest.fn();
    const action = init();
    analytics()(mockNext)(action);
    expect(NativeModules.Analytics.trackEvent).toBeCalledWith("Screen Event", {
      screen: HOME
    });
  });
});
