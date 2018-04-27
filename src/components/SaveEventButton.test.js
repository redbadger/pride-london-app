// @flow
import React from "react";
import { Animated, Easing } from "react-native";
import { shallow } from "enzyme";
import SaveEventButton from "./SaveEventButton";

it("renders correctly", () => {
  const output = shallow(<SaveEventButton active={false} onPress={() => {}} />);
  expect(output).toMatchSnapshot();
});

describe("update from inactive to active", () => {
  it("animates the heart", () => {
    const mockAnimatedValue = {};
    jest.mock("Animated", () => ({
      timing: jest.fn(() => ({
        start: jest.fn()
      })),
      Value: jest.fn(() => mockAnimatedValue)
    }));

    const onPress = () => {};
    const output = shallow(
      <SaveEventButton active={false} onPress={onPress} />
    );

    output.setProps({ active: true, onPress });
    expect(Animated.timing).toBeCalledWith(mockAnimatedValue, {
      duration: 1920,
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: true
    });
  });
});

describe("update from active to inactive", () => {
  it("animates to start of animation", () => {
    const mockAnimatedValue = {};
    jest.mock("Animated", () => ({
      timing: jest.fn(() => ({
        start: jest.fn()
      })),
      Value: jest.fn(() => mockAnimatedValue)
    }));

    const onPress = () => {};
    const output = shallow(<SaveEventButton active onPress={onPress} />);

    output.setProps({ active: false, onPress });
    expect(Animated.timing).toBeCalledWith(mockAnimatedValue, {
      duration: 0,
      toValue: 0,
      easing: Easing.linear,
      useNativeDriver: true
    });
  });
});

describe("update from inactive to inactive", () => {
  it("animates to start of animation", () => {
    const mockAnimatedValue = {};
    jest.mock("Animated", () => ({
      timing: jest.fn(() => ({
        start: jest.fn()
      })),
      Value: jest.fn(() => mockAnimatedValue)
    }));

    const onPress = () => {};
    const output = shallow(
      <SaveEventButton active={false} onPress={onPress} />
    );

    output.setProps({ active: false, onPress });
    expect(Animated.timing).toBeCalledWith(mockAnimatedValue, {
      duration: 0,
      toValue: 0,
      easing: Easing.linear,
      useNativeDriver: true
    });
  });
});

describe("update from active to active", () => {
  it("animates to end of animation", () => {
    const mockAnimatedValue = {};
    jest.mock("Animated", () => ({
      timing: jest.fn(() => ({
        start: jest.fn()
      })),
      Value: jest.fn(() => mockAnimatedValue)
    }));

    const onPress = () => {};
    const output = shallow(<SaveEventButton active onPress={onPress} />);

    output.setProps({ active: true, onPress });
    expect(Animated.timing).toBeCalledWith(mockAnimatedValue, {
      duration: 0,
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: true
    });
  });
});
