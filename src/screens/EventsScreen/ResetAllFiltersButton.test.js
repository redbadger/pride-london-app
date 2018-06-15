// @flow
import React from "react";
import { Animated } from "react-native";
import { shallow } from "enzyme";
import ResetAllFiltersButton from "./ResetAllFiltersButton";
import FilterHeaderButton from "./FilterHeaderButton";

const noOp = () => {};

it("renders correctly", () => {
  const output = shallow(<ResetAllFiltersButton visible onPress={noOp} />);
  expect(output).toMatchSnapshot();
});

it("does not render when visible=false", () => {
  const output = shallow(
    <ResetAllFiltersButton visible={false} onPress={noOp} />
  );
  expect(output).toMatchSnapshot();
});

it("calls onPress method when pressed", () => {
  const onPress = jest.fn();
  const output = shallow(
    <ResetAllFiltersButton
      visible
      onPress={onPress}
      animationTime={0}
      animationDelay={0}
    />
  );

  output
    .find(FilterHeaderButton)
    .props()
    .onPress();

  expect(onPress).toHaveBeenCalled();
});

it("resets animation after being pressed", () => {
  const onPress = jest.fn();
  const output = shallow(
    <ResetAllFiltersButton
      visible
      onPress={onPress}
      animationTime={0}
      animationDelay={0}
    />
  );

  output
    .find(FilterHeaderButton)
    .props()
    .onPress();

  expect(output.state().isAnimating).toBeFalsy();
  expect(output.instance().fadeValue).toEqual(new Animated.Value(1));
  expect(output.instance().topOffset).toEqual(new Animated.Value(0));
});

it("sets header height for use with animation", () => {
  const output = shallow(<ResetAllFiltersButton visible onPress={noOp} />);
  const mockEvent = {
    nativeEvent: { layout: { height: 100 } }
  };
  output.instance().setButtonHeight(mockEvent);

  expect(output.instance().height).toEqual(100);
});
