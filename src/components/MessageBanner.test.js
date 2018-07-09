// @flow
import React from "react";
import { shallow } from "enzyme";
import { Animated } from "react-native";
import MessageBanner from "./MessageBanner";

let timingSpy;
let sequenceSpy;

const defaultProps = {
  title: "Testing the message title",
  message: "Testing the message banner"
};

const render = props => shallow(<MessageBanner {...props} />);

beforeEach(() => {
  jest.useFakeTimers();
  timingSpy = jest.spyOn(Animated, "timing");
  sequenceSpy = jest.spyOn(Animated, "sequence");
});

afterEach(() => {
  timingSpy.mockRestore();
  sequenceSpy.mockRestore();
});

it("renders with no errors", () => {
  const output = render(defaultProps);
  expect(output).toMatchSnapshot();
});

describe("showBanner", () => {
  it("should run animation sequence when handleAnimation is called", () => {
    const output = render(defaultProps);
    output.instance().showBanner();
    expect(sequenceSpy).toHaveBeenCalled();
  });

  it("should run animation sequence with correct values", () => {
    const output = render(defaultProps);
    output.instance().showBanner();
    expect(timingSpy.mock.calls[0][1].toValue).toEqual(90);
    expect(timingSpy.mock.calls[1][1].toValue).toEqual(0);
  });

  it("should reset isAnimating to false after animation is complete", () => {
    const mockTimingValue = {
      start: jest.fn(),
      stop: jest.fn()
    };
    sequenceSpy.mockReturnValue(mockTimingValue);

    const output = render(defaultProps);

    output.instance().showBanner();
    const completeAnimation = mockTimingValue.start.mock.calls[0][0];

    completeAnimation(({ finished }) => {
      expect(finished).toBe(true);
      expect(output.instance().isAnimating).toEqual(false);
    });
  });

  it("animation sequence should not run if isAnimating is true", () => {
    const output = render(defaultProps);
    output.instance().isAnimating = true;

    output.instance().showBanner();
    expect(sequenceSpy).not.toHaveBeenCalled();
  });
});

describe("hideBanner", () => {
  it("should be able to reset initial animation value to 0", () => {
    const output = render(defaultProps);
    const instance = output.instance();

    instance.hideBanner();
    expect(timingSpy).toHaveBeenCalledTimes(1);
    expect(timingSpy.mock.calls[0][1].toValue).toEqual(0);
  });

  it("should reset isAnimating to false after animation is complete", () => {
    const output = render(defaultProps);
    output.instance().isAnimating = true;
    output.instance().slideAnimation = () => ({
      start: callback => callback({ finished: true })
    });

    output.instance().hideBanner();

    expect(output.instance().isAnimating).toEqual(false);
  });
});
