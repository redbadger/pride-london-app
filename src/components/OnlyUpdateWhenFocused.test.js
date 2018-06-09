// @flow
import React from "react";
import { shallow } from "enzyme";
import { Text } from "react-native";
import { OnlyUpdateWhenFocusedComponent } from "./OnlyUpdateWhenFocused";

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
            listeners[type] = undefined;
          }
        };
      }
    }
  };
};

it("does not update if props.navigation.isFocused returns true", () => {
  const { navigation } = createNavigation({ isFocused: () => true });
  const output = shallow(
    <OnlyUpdateWhenFocusedComponent navigation={navigation}>
      <Text>Hello</Text>
    </OnlyUpdateWhenFocusedComponent>
  );
  expect(output.instance().shouldComponentUpdate()).toEqual(true);
});

it("does update if props.navigation.isFocused returns false", () => {
  const { navigation } = createNavigation({ isFocused: () => false });
  const output = shallow(
    <OnlyUpdateWhenFocusedComponent navigation={navigation}>
      <Text>Hello</Text>
    </OnlyUpdateWhenFocusedComponent>
  );

  expect(output.instance().shouldComponentUpdate()).toEqual(false);
});

it("does update after navigation emits willFocus", () => {
  const { navigation, listeners } = createNavigation({
    isFocused: () => false
  });
  const output = shallow(
    <OnlyUpdateWhenFocusedComponent navigation={navigation}>
      <Text>Hello</Text>
    </OnlyUpdateWhenFocusedComponent>
  );
  listeners.willFocus();
  expect(output.instance().shouldComponentUpdate()).toEqual(true);
});

it("does not update after navigation emits willBlur", () => {
  const { navigation, listeners } = createNavigation({ isFocused: () => true });
  const output = shallow(
    <OnlyUpdateWhenFocusedComponent navigation={navigation}>
      <Text>Hello</Text>
    </OnlyUpdateWhenFocusedComponent>
  );
  listeners.willBlur();
  expect(output.instance().shouldComponentUpdate()).toEqual(false);
});
