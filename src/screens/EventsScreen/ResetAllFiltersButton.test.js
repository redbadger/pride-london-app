// @flow
import React from "react";
import { Animated, InteractionManager } from "react-native";
import { shallow } from "enzyme";
import ResetAllFiltersButton from "./ResetAllFiltersButton";
import FilterHeaderButton from "./FilterHeaderButton";

const noOp = () => {};

let runAfterInteractionsSpy;
let animatedParallelSpy;
let animatedTimingSpy;

beforeEach(() => {
  runAfterInteractionsSpy = jest
    .spyOn(InteractionManager, "runAfterInteractions")
    .mockImplementation(noOp);
  animatedParallelSpy = jest
    .spyOn(Animated, "parallel")
    .mockImplementation(noOp);
  animatedTimingSpy = jest.spyOn(Animated, "timing").mockImplementation(noOp);
});

afterEach(() => {
  runAfterInteractionsSpy.mockRestore();
  animatedParallelSpy.mockRestore();
  animatedTimingSpy.mockRestore();
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

  output.find(FilterHeaderButton).simulate("press");

  expect(runAfterInteractionsSpy).toHaveBeenCalled();
  expect(mockOnPress).toHaveBeenCalled();
});

it("starts animation after being pressed", () => {
  const output = shallow(
    <ResetAllFiltersButton
      visible
      onPress={noOp}
      animationTime={0}
      animationDelay={0}
    />
  );

  const animation = { start: jest.fn() };
  animatedParallelSpy.mockReturnValue(animation);

  output.find(FilterHeaderButton).simulate("press");

  // Animation should start after interaction.
  const interactionCallback = runAfterInteractionsSpy.mock.calls[0][0];
  interactionCallback();

  expect(output.state().isAnimating).toBe(true);
  expect(animatedParallelSpy).toHaveBeenCalled();
  expect(animatedTimingSpy).toHaveBeenCalledTimes(2);
  expect(animation.start).toHaveBeenCalled();

  // Callback is called when animation is completed.
  const completedCallback = animation.start.mock.calls[0][0];
  completedCallback();

  expect(output.state().isAnimating).toBe(false);
  expect(output.instance().fadeValue).toEqual(new Animated.Value(1));
  expect(output.instance().topOffset).toEqual(new Animated.Value(0));
});

it("resets animation on unmount", () => {
  const output = shallow(
    <ResetAllFiltersButton
      visible
      onPress={noOp}
      animationTime={0}
      animationDelay={0}
    />
  );

  const animation = { start: jest.fn() };
  animatedParallelSpy.mockReturnValue(animation);

  output.find(FilterHeaderButton).simulate("press");

  // Animation should start after interaction.
  const interactionCallback = runAfterInteractionsSpy.mock.calls[0][0];
  interactionCallback();

  expect(output.state().isAnimating).toBe(true);

  // Unmount.
  output.unmount();

  // expect(output.state().isAnimating).toBe(false);
  // expect(output.instance().fadeValue).toEqual(new Animated.Value(1));
  // expect(output.instance().topOffset).toEqual(new Animated.Value(0));

  // Completion callback does not make it crash.
  const completedCallback = animation.start.mock.calls[0][0];
  completedCallback();
});

it("sets header height for use with animation", () => {
  const output = shallow(<ResetAllFiltersButton visible onPress={noOp} />);
  const mockEvent = {
    nativeEvent: { layout: { height: 100 } }
  };
  output.instance().setButtonHeight(mockEvent);

  expect(output.instance().height).toEqual(100);
});
