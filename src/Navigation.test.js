// import React from "react";
// import { shallow } from "enzyme";
// import Navigation from "./Navigation";
import { hideTabBarOnSubRoutes, getTabTestId } from "./Navigation";
import {
  EVENT_LIST,
  EVENT_DETAILS,
  HOME,
  PARADE,
  SAVED_EVENT_LIST,
  SUPPORT_US
} from "./constants/routes";

// TODO: Temporarily disabled due to https://github.com/react-navigation/react-navigation/issues/256
it("renders correctly", () => {
  // const output = shallow(<Navigation />);
  // console.log(output);
  // expect(() => renderer.create(<Navigation />)).not.toThrow();
});

describe("hideTabBarOnSubRoutes", () => {
  it("sets the visibility of the tab bar to true when the route is the same as the stack's initial route", () => {
    const navigation = {
      state: {
        index: 0,
        key: HOME,
        routeName: HOME,
        routes: [{ routeName: HOME }]
      }
    };
    const navigationOptions = {};
    const result = hideTabBarOnSubRoutes(HOME, navigationOptions)({
      navigation
    });
    expect(result.tabBarVisible).toEqual(true);
  });

  it("sets visibility of tab bar to false when current route name not the same as stack's initial route", () => {
    const navigation = {
      state: {
        index: 1,
        key: HOME,
        routeName: HOME,
        routes: [{ routeName: HOME }, { routeName: EVENT_DETAILS }]
      }
    };
    const navigationOptions = { tabBarVisible: true };
    const result = hideTabBarOnSubRoutes(HOME, navigationOptions)({
      navigation
    });
    expect(result.tabBarVisible).toEqual(false);
  });
});

describe("getTabTestId", () => {
  it("returns an empty string by default", () => {
    const result1 = getTabTestId();
    expect(result1).toEqual("");
    const result2 = getTabTestId("randomString");
    expect(result2).toEqual("");
  });

  it("returns a test id if the routeName is matched", () => {
    const result = getTabTestId(EVENT_LIST);
    expect(result).toEqual("events-tab-button");

    const result1 = getTabTestId(PARADE);
    expect(result1).toEqual("parade-tab-button");

    const result2 = getTabTestId(SAVED_EVENT_LIST);
    expect(result2).toEqual("saved-events-tab-button");

    const result3 = getTabTestId(SUPPORT_US);
    expect(result3).toEqual("support-us-tab-button");
  });
});
