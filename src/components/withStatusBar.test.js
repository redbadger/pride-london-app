// @flow
import React from "react";
import { Platform, StatusBar } from "react-native";
import { shallow } from "enzyme";
import withStatusBar from "./withStatusBar";

jest.mock("react-native", () => {
  const statusBar = () => {};
  statusBar.currentHeight = 10;
  statusBar.setHidden = jest.fn();
  statusBar.setBarStyle = jest.fn();
  statusBar.setNetworkActivityIndicatorVisible = jest.fn();

  return {
    Platform: {
      OS: "TDB"
    },
    StatusBar: statusBar,
    StyleSheet: { create: obj => obj },
    View: () => null
  };
});

it("renders correctly on iOS", () => {
  Platform.OS = "ios";
  const Component = () => null;
  const ComponentWithStatusBar = withStatusBar(Component, {});
  const navigation = { addListener: jest.fn() };
  const output = shallow(<ComponentWithStatusBar navigation={navigation} />);
  expect(output).toMatchSnapshot();
});

it("renders correctly on Android", () => {
  Platform.OS = "android";
  const Component = () => null;
  const ComponentWithStatusBar = withStatusBar(Component, {});
  const navigation = { addListener: jest.fn() };
  const output = shallow(<ComponentWithStatusBar navigation={navigation} />);
  expect(output).toMatchSnapshot();
});

it("renders correctly on Android with translucent status bar", () => {
  Platform.OS = "android";
  const Component = () => null;
  const ComponentWithStatusBar = withStatusBar(Component, {
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    translucent: true
  });
  const navigation = { addListener: jest.fn() };
  const output = shallow(<ComponentWithStatusBar navigation={navigation} />);
  expect(output).toMatchSnapshot();
});

it("updates the status bar when component gets focused", () => {
  Platform.OS = "ios";
  const Component = () => null;
  const ComponentWithStatusBar = withStatusBar(Component, {});
  const removeListener = jest.fn();
  const navigation = {
    addListener: jest.fn().mockReturnValue({ remove: removeListener })
  };

  const output = shallow(<ComponentWithStatusBar navigation={navigation} />);
  expect(navigation.addListener).toHaveBeenCalledWith(
    "didFocus",
    expect.any(Function)
  );

  const listener = navigation.addListener.mock.calls[0][1];
  listener();
  expect(StatusBar.setHidden).toHaveBeenCalled();
  expect(StatusBar.setBarStyle).toHaveBeenCalled();
  expect(StatusBar.setNetworkActivityIndicatorVisible).toHaveBeenCalled();

  output.unmount();
  expect(removeListener).toHaveBeenCalled();
});
