// @flow
import React from "react";
import { Animated, InteractionManager } from "react-native";
import { shallow } from "enzyme";
import ResetAllFiltersButton from "./ResetAllFiltersButton";
import FilterHeaderButton from "./FilterHeaderButton";

const noOp = () => {};

let runAfterInteractionsSpy;

beforeEach(() => {
  runAfterInteractionsSpy = jest
    .spyOn(InteractionManager, "runAfterInteractions")
    .mockImplementation(() => ({
      runAfterInteractions: jest.fn()
    }));
});

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
  const mockOnPress = jest.fn();
  const output = shallow(
    <ResetAllFiltersButton
      visible
      animationTime={0}
      animationDelay={0}
      onPress={mockOnPress}
    />
  );

  output
    .find(FilterHeaderButton)
    .props()
    .onPress();

  expect(runAfterInteractionsSpy).toHaveBeenCalled();
  expect(mockOnPress).toHaveBeenCalled();
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
