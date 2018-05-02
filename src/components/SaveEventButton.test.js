// @flow
import React from "react";
import { Animated, Easing } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { shallow } from "enzyme";
import SaveEventButton from "./SaveEventButton";

jest.mock("react-native-haptic-feedback", () => {
  const value = jest.fn();
  value.trigger = jest.fn();
  return value;
});

beforeEach(() => {
  ReactNativeHapticFeedback.mockClear();
});

it("renders correctly", () => {
  const output = shallow(<SaveEventButton active={false} onPress={() => {}} />);
  output.setState({ progress: new Animated.Value(0) });
  expect(output).toMatchSnapshot();
});

describe("getDerivedStateFromProps", () => {
  it("returns state with progress as animated value of 1 when state.progress = null and props.active = true", () => {
    const props = {
      active: true,
      onDark: false,
      onPress: () => {}
    };
    const state = {};
    expect(
      SaveEventButton.getDerivedStateFromProps(props, state)
    ).toMatchSnapshot();
  });

  it("returns state with progress as animated value of 0 when state.progress = null and props.active = false", () => {
    const props = {
      active: false,
      onDark: false,
      onPress: () => {}
    };
    const state = {};
    expect(
      SaveEventButton.getDerivedStateFromProps(props, state)
    ).toMatchSnapshot();
  });

  it("returns null when progress does not exist", () => {
    const props = {
      active: true,
      onDark: false,
      onPress: () => {}
    };
    const state = {
      progress: new Animated.Value(1)
    };
    expect(SaveEventButton.getDerivedStateFromProps(props, state)).toEqual(
      null
    );
  });
});

describe("update from inactive to active", () => {
  it("animates the heart and vibrates", () => {
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

    output.setState({ progress: new Animated.Value(0) });
    output.setProps({ active: true, onPress });
    expect(Animated.timing).toBeCalledWith(mockAnimatedValue, {
      duration: 800,
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: true
    });
    expect(ReactNativeHapticFeedback.trigger).toBeCalledWith("impactHeavy");
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

    output.setState({ progress: new Animated.Value(1) });
    output.setProps({ active: false, onPress });
    expect(Animated.timing).toBeCalledWith(mockAnimatedValue, {
      duration: 0,
      toValue: 0,
      easing: Easing.linear,
      useNativeDriver: true
    });
  });
});
