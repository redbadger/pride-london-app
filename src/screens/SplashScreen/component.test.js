// @flow
import React from "react";
import { View, Animated } from "react-native";
import { shallow } from "enzyme";
import SplashScreenController from "react-native-splash-screen";
import SplashScreen from "./component";

// all this mocking is making me sad.
const startMock = jest.fn();
const timingMock = jest.spyOn(Animated, "timing");
const staggerMock = jest.spyOn(Animated, "stagger").mockImplementation(() => ({
  start: startMock
}));
const splashScreenControllerMock = jest.spyOn(SplashScreenController, "hide");

it("renders correctly when showing", () => {
  const output = shallow(
    <SplashScreen
      state="showing"
      onAnimationComplete={() => {}}
      loading={false}
      noDataReceived={false}
      getData={() => {}}
    >
      hello
    </SplashScreen>
  );

  expect(output).toMatchSnapshot();
});

it("renders correctly when hidden", () => {
  const output = shallow(
    <SplashScreen
      state="hidden"
      onAnimationComplete={() => {}}
      loading={false}
      noDataReceived={false}
      getData={() => {}}
    >
      hello
    </SplashScreen>
  );

  expect(output).toMatchSnapshot();
});

it("calls splash screen controller hide on component mount", () => {
  shallow(
    <SplashScreen
      state="showing"
      onAnimationComplete={() => {}}
      loading={false}
      noDataReceived={false}
      getData={() => {}}
    >
      hello
    </SplashScreen>
  );

  expect(splashScreenControllerMock).toHaveBeenCalled();
});

describe("Animation", () => {
  it("creates animated values", () => {
    const state = SplashScreen.getDerivedStateFromProps(
      {
        children: <View />,
        onAnimationComplete: () => {},
        state: "showing",
        noDataReceived: false,
        loading: false,
        getData: () => {}
      },
      { heart: null, slide: null }
    );

    expect(state).not.toBe(null);

    // flow... 🎺
    if (state) {
      expect(state.heart).toBeInstanceOf(Animated.Value);
      expect(state.slide).toBeInstanceOf(Animated.Value);
    }
  });

  it("does not reset the values if they exist", () => {
    const state = SplashScreen.getDerivedStateFromProps(
      {
        children: <View />,
        onAnimationComplete: () => {},
        state: "showing",
        noDataReceived: false,
        loading: false,
        getData: () => {}
      },
      { heart: new Animated.Value(0), slide: new Animated.Value(0) }
    );

    expect(state).toBe(null);
  });

  it("does not animate unless the state is 'hiding'", () => {
    const instance = shallow(
      <SplashScreen
        state="hidden"
        onAnimationComplete={() => {}}
        loading={false}
        noDataReceived={false}
        getData={() => {}}
      >
        <View />
      </SplashScreen>
    ).instance();

    instance.componentDidUpdate();

    expect(timingMock).not.toHaveBeenCalled();
  });

  it("starts the animations when the state is 'hiding'", () => {
    const screen = shallow(
      <SplashScreen
        state="hiding"
        onAnimationComplete={() => {}}
        loading={false}
        noDataReceived={false}
        getData={() => {}}
      >
        <View />
      </SplashScreen>
    );

    screen.instance().componentDidUpdate();

    expect(timingMock).toHaveBeenCalled();
    expect(timingMock.mock.calls.length).toBe(2);

    expect(timingMock.mock.calls[0][0]).toBe(screen.state("heart"));
    expect(timingMock.mock.calls[1][0]).toBe(screen.state("slide"));

    expect(staggerMock).toHaveBeenCalled();
    expect(startMock).toHaveBeenCalled();

    timingMock.mockClear();
    staggerMock.mockClear();
    startMock.mockClear();
  });

  it("calls onAnimationCompleteProp when the animation is done", () => {
    const onAnimation = () => {};
    const screen = shallow(
      <SplashScreen
        state="hiding"
        onAnimationComplete={onAnimation}
        loading={false}
        noDataReceived={false}
        getData={() => {}}
      >
        <View />
      </SplashScreen>
    );

    screen.instance().componentDidUpdate();

    expect(startMock).toHaveBeenCalled();
    expect(startMock.mock.calls[0][0]).toBe(onAnimation);

    timingMock.mockClear();
    staggerMock.mockClear();
    startMock.mockClear();
  });
});
