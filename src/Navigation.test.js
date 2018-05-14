// import React from "react";
// import { shallow } from "enzyme";
// import Navigation from "./Navigation";
import { getNavigationOptions } from "./Navigation";

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
      key: "HOME",
      routeName: "HOME",
      routes: [{ routeName: "HOME" }]
    }
  };

  it("sets the visibility of the tab bar to false when the route name is specified", () => {
    const navigationOptions = { tabBarVisible: true };
    const result = getNavigationOptions(navigation, navigationOptions, [
      "HOME"
    ]);
    expect(result.tabBarVisible).toEqual(false);
  });

  it("leaves the visibility of the tab bar as true when route name not specified", () => {
    const navigationOptions = { tabBarVisible: true };
    const result = getNavigationOptions(navigation, navigationOptions, [
      "EVENT_DETAILS",
      "FEATURED_EVENTS_LIST"
    ]);
    expect(result.tabBarVisible).toEqual(true);
  });
});
