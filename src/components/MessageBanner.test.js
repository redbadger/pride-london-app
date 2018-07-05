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

const render = props => shallow(<MessageBanner {...props} />);

beforeEach(() => {
  timingSpy = jest.spyOn(Animated, "timing").mockImplementation(() => ({
    start: jest.fn()
  }));
});

afterEach(() => {
  timingSpy.mockRestore();
});

it("renders with no errors", () => {
  const output = render(defaultProps);
  expect(output).toMatchSnapshot();
});

describe("handleAnimation", () => {
  it("should run animation sequence when mounted", () => {
    const sequenceSpy = jest
      .spyOn(Animated, "sequence")
      .mockImplementation(() => ({
        start: jest.fn()
      }));

    const output = render(defaultProps);

    output.instance().handleAnimation();

    expect(sequenceSpy).toHaveBeenCalled();
  });

  it("should run animation sequence with correct values", () => {
    const output = render(defaultProps);

    output.instance().handleAnimation();

    expect(timingSpy).toHaveBeenCalledTimes(2);
    expect(timingSpy.mock.calls[0][1].toValue).toEqual(90);
    expect(timingSpy.mock.calls[1][1].toValue).toEqual(0);
  });

  it("should set isAnimating to true on animation start", () => {
    const output = render(defaultProps);

    output.instance().handleAnimation();
    expect(output.instance().isAnimating).toEqual(true);
  });

  it("should reset isAnimating to false after animation is complete", () => {
    jest.useFakeTimers();
    const output = render(defaultProps);

    setTimeout(() => {
      expect(output.instance().isAnimating).toEqual(false);
    });

    jest.clearAllTimers();
  });
});

describe("resetAnimation", () => {
  it("should be able to reset initial animation value to 0", () => {
    const output = render(defaultProps);
    const instance = output.instance();

    instance.resetAnimation();
    expect(timingSpy).toHaveBeenCalledTimes(1);
    expect(timingSpy.mock.calls[0][1].toValue).toEqual(0);
  });

  it("should reset isAnimating to false after animation is complete", () => {
    jest.useFakeTimers();

    const output = render(defaultProps);
    const instance = output.instance();

    instance.resetAnimation();
    setTimeout(() => {
      expect(output.instance().isAnimating).toEqual(false);
    });

    jest.clearAllTimers();
  });
});
