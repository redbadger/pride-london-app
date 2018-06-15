// @flow
import React from "react";
import { shallow } from "enzyme";
import { Text } from "react-native";
import withIsFocused from "./WithIsFocused";

const createNavigation = ({ isFocused }) => {
  const listeners = {};
  return {
    listeners,
    navigation: {
      isFocused,
      addListener: (type, callback) => {
        listeners[type] = callback;
        return {
          remove: () => {
            delete listeners[type];
          }
        };
      }
    }
  };
};

const Test = () => <Text>Hello</Text>;

it("intializes isFocused to props.navigation.isFocused", () => {
  const { navigation } = createNavigation({ isFocused: () => true });
  const WithIsFocusedComponent = withIsFocused(Test);
  const output = shallow(<WithIsFocusedComponent navigation={navigation} />);
  expect(output.find(Test).props()).toEqual({ isFocused: true, navigation });
});

it("sets state.isFocused to true when navigation emits willFocus", () => {
  const { navigation, listeners } = createNavigation({
    isFocused: () => false
  });
  const WithIsFocusedComponent = withIsFocused(Test);
  const output = shallow(<WithIsFocusedComponent navigation={navigation} />);
  listeners.willFocus();
  output.update();
  expect(output.find(Test).props()).toEqual({ isFocused: true, navigation });
});

it("sets state.isFocused to false when navigation emits willBlur", () => {
  const { navigation, listeners } = createNavigation({ isFocused: () => true });
  const WithIsFocusedComponent = withIsFocused(Test);
  const output = shallow(<WithIsFocusedComponent navigation={navigation} />);
  listeners.willBlur();
  output.update();
  expect(output.find(Test).props()).toEqual({ isFocused: false, navigation });
});

it("removes navigation listeners on umount", () => {
  const { navigation, listeners } = createNavigation({ isFocused: () => true });
  const WithIsFocusedComponent = withIsFocused(Test);
  const output = shallow(<WithIsFocusedComponent navigation={navigation} />);
  expect(Object.values(listeners).length).toBe(2);
  output.unmount();
  expect(Object.values(listeners).length).toBe(0);
});
