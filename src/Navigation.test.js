// import React from "react";
// import { shallow } from "enzyme";
// import Navigation from "./Navigation";
import { getNavigationOptions, getTabTestId } from "./Navigation";
import {
  EVENT_LIST,
  EVENT_DETAILS,
  FEATURED_EVENT_LIST,
  HOME
} from "./constants/routes";

// TODO: Temporarily disabled due to https://github.com/react-navigation/react-navigation/issues/256
it("renders correctly", () => {
  // const output = shallow(<Navigation />);
  // console.log(output);
  // expect(() => renderer.create(<Navigation />)).not.toThrow();
});

describe("getNavigationOptions", () => {
  const navigation = {
    state: {
      index: 0,
      key: HOME,
      routeName: HOME,
      routes: [{ routeName: HOME }]
    }
  };

  it("sets the visibility of the tab bar to false when the route name is specified", () => {
    const navigationOptions = { tabBarVisible: true };
    const result = getNavigationOptions(navigation, navigationOptions, [HOME]);
    expect(result.tabBarVisible).toEqual(false);
  });

  it("leaves the visibility of the tab bar as true when route name not specified", () => {
    const navigationOptions = { tabBarVisible: true };
    const result = getNavigationOptions(navigation, navigationOptions, [
      EVENT_DETAILS,
      FEATURED_EVENT_LIST
    ]);
    expect(result.tabBarVisible).toEqual(true);
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
  });
});
