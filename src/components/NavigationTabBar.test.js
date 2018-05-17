// @flow
import React from "react";
import { Animated, Text } from "react-native";
import { shallow } from "enzyme";
import NavigationTabBar from "./NavigationTabBar";

let timingSpy;
const navigationDispatch = jest.fn();

const render = props =>
  shallow(
    <NavigationTabBar
      position={new Animated.Value(0)}
      navigation={{
        dispatch: navigationDispatch,
        state: {
          index: 0,
          routes: [
            { key: "1", index: 1, routeName: "tab-0" },
            { key: "2", routeName: "tab-1" }
          ]
        }
      }}
      jumpTo={() => {}}
      getTabTestID={routeName => routeName}
      renderIcon={scene => <Text>{scene.index}</Text>}
      getLabelText={scene => `Tab ${scene.index}`}
      {...props}
    />
  );

beforeEach(() => {
  timingSpy = jest.spyOn(Animated, "timing").mockImplementation(() => ({
    start: jest.fn()
  }));
});

it("renders correctly", () => {
  const output = render();
  expect(output).toMatchSnapshot();
});

it("stores measurements of tab bar onLayout", () => {
  const output = render();
  const layout = { width: 100, height: 200 };
  output
    .find({ testID: "tab-bar" })
    .props()
    .onLayout({
      nativeEvent: { layout }
    });
  expect(output.instance().tabBarLayout).toBe(layout);
});

it("stores measurements of tabs onLayout", () => {
  const output = render();
  const layout = { width: 100, height: 200 };
  output
    .find({ testID: "tab-0" })
    .props()
    .onLayout({
      nativeEvent: { layout }
    });
  expect(output.instance().tabLayouts[0]).toBe(layout);
});

it("jumps to tab onPress", () => {
  const jumpTo = jest.fn();
  const output = render({ jumpTo });
  output
    .find({ testID: "tab-1" })
    .props()
    .onPress();
  expect(jumpTo).toHaveBeenCalledWith("2");
});

it("animates active tab line on focus change", () => {
  const output = render();
  const instance = output.instance();
  instance.tabBarLayout = { x: 50, width: 400 };
  instance.tabLayouts = {
    "0": { x: 0, width: 48 },
    "1": { x: 60, width: 48 }
  };
  instance.componentDidUpdate();

  expect(timingSpy).toHaveBeenCalledTimes(3);
  expect(timingSpy).toHaveBeenCalledWith(instance.tabBarWidth, {
    toValue: instance.tabBarLayout.width,
    duration: 150,
    useNativeDriver: true
  });
});

afterEach(() => {
  timingSpy.mockRestore();
  navigationDispatch.mockClear();
});
