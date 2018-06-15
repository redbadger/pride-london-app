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

it("intializes state to props.navigation.isFocused", () => {
  const { navigation } = createNavigation({ isFocused: () => true });
  const output = shallow(
    <OnlyUpdateWhenFocusedComponent navigation={navigation}>
      <Text>Hello</Text>
    </OnlyUpdateWhenFocusedComponent>
  );
  expect(output.state()).toEqual({ isFocused: true });
});

it("does update if nextState.isFocused returns true", () => {
  const { navigation } = createNavigation({ isFocused: () => true });
  const output = shallow(
    <OnlyUpdateWhenFocusedComponent navigation={navigation}>
      <Text>Hello</Text>
    </OnlyUpdateWhenFocusedComponent>
  );
  expect(
    output.instance().shouldComponentUpdate({ navigation }, { isFocused: true })
  ).toEqual(true);
});

it("does not update if nextState.isFocused returns false", () => {
  const { navigation } = createNavigation({ isFocused: () => true });
  const output = shallow(
    <OnlyUpdateWhenFocusedComponent navigation={navigation}>
      <Text>Hello</Text>
    </OnlyUpdateWhenFocusedComponent>
  );
  expect(
    output
      .instance()
      .shouldComponentUpdate({ navigation }, { isFocused: false })
  ).toEqual(false);
});

it("sets state.isFocused to true when navigation emits willFocus", () => {
  const { navigation, listeners } = createNavigation({
    isFocused: () => false
  });
  const output = shallow(
    <OnlyUpdateWhenFocusedComponent navigation={navigation}>
      <Text>Hello</Text>
    </OnlyUpdateWhenFocusedComponent>
  );
  listeners.willFocus();
  expect(output.state()).toEqual({ isFocused: true });
});

it("sets state.isFocused to false when navigation emits willBlur", () => {
  const { navigation, listeners } = createNavigation({ isFocused: () => true });
  const output = shallow(
    <OnlyUpdateWhenFocusedComponent navigation={navigation}>
      <Text>Hello</Text>
    </OnlyUpdateWhenFocusedComponent>
  );
  listeners.willBlur();
  expect(output.state()).toEqual({ isFocused: false });
});
