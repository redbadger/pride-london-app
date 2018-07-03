// @flow
import React from "react";
import { shallow } from "enzyme";
import { Animated } from "react-native";
import MessageBanner from "./MessageBanner";

let timingSpy;

const defaultProps = {
  title: "Testing the message title",
  message: "Testing the message banner"
};

const render = props => {
  return shallow(<MessageBanner {...props} />);
};

beforeEach(() => {
  timingSpy = jest.spyOn(Animated, "timing").mockImplementation(() => ({
    start: jest.fn()
  }));
});

afterEach(() => timingSpy.mockRestore());

it("it renders correctly", () => {
  const output = render(defaultProps);
  expect(output).toMatchSnapshot();
});

it("should animate the banner", () => {
  const sequenceSpy = jest
    .spyOn(Animated, "sequence")
    .mockImplementation(() => ({
      start: jest.fn()
    }));

  const timingSpy = jest.spyOn(Animated, "timing");

  const output = render(defaultProps);
  const instance = output.instance();

  expect(sequenceSpy).toHaveBeenCalled();
  expect(timingSpy).toHaveBeenCalledTimes(2);
  expect(timingSpy.mock.calls[0][0]);
});

it("should be able to reverse initial animation", () => {
  const timingSpy = jest.spyOn(Animated, "timing").mockImplementation(() => ({
    start: () => {
      return { finished: true };
    }
  }));

  const output = render(defaultProps);
  const instance = output.instance();

  instance.stopAnimation();
  expect(timingSpy).toHaveBeenCalled();
});

// // handleAnimation
// it("animates message banner", () => {
//   const sequenceSpy = jest
//     .spyOn(Animated, "sequence")
//     .mockImplementation(() => ({
//       start: jest.fn()
//     }));

//   const timingSpy = jest.spyOn(Animated, "timing").mockImplementation(() => ({
//     start: jest.fn()
//   }));

//   const output = shallow(<MessageBanner />);
//   const instance = output.instance();

//   instance.handleAnimation();

//   expect(sequenceSpy).toHaveBeenCalled();
//   expect(timingSpy).toHaveBeenCalled();
// });

// intitialize
// checking if state is updated with message data values

// handleAnimation
// once animation is finished, check if state isAnimating property is set to false

// stopAnimation
// once animation is finished, check if state isAnimating property is set to false
