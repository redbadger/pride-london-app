// @flow
import React from "react";
import { shallow } from "enzyme";
import { Animated } from "react-native";
import MessageBanner from "./MessageBanner";

it("it renders correctly", () => {
  const output = shallow(<MessageBanner />);
  expect(output).toMatchSnapshot();
});

// handleAnimation
it("animates message banner", () => {
  const sequenceSpy = jest
    .spyOn(Animated, "sequence")
    .mockImplementation(() => ({
      start: jest.fn()
    }));

  const timingSpy = jest.spyOn(Animated, "timing").mockImplementation(() => ({
    start: jest.fn()
  }));

  const output = shallow(<MessageBanner />);
  const instance = output.instance();

  instance.handleAnimation();

  expect(sequenceSpy).toHaveBeenCalled();
  expect(timingSpy).toHaveBeenCalled();
});
