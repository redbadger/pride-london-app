// @flow
import React from "react";
import { Animated } from "react-native";
import { shallow } from "enzyme";
import ShadowedScrollView from "./ShadowedScrollView";

const render = () => shallow(<ShadowedScrollView />);

it("renders correctly", () => {
  const output = render();
  expect(output).toMatchSnapshot();
});

describe("#fadeTopShadow", () => {
  it(" animates the top shadow", () => {
    jest.mock("Animated", () => ({
      createTimer: jest.fn(),
      timing: jest.fn(() => ({
        start: jest.fn()
      })),
      Value: jest.fn(() => ({
        interpolate: jest.fn()
      }))
    }));

    const component = new ShadowedScrollView();
    component.topShadowOpacity = { value: 1 };
    component.fadeTopShadow(1);
    expect(Animated.timing).toBeCalledWith(
      { value: 1 },
      {
        duration: 100,
        toValue: 1,
        useNativeDriver: true
      }
    );
  });
});

describe("fadeBottomShadow", () => {
  it("animates the bottom shadow", () => {
    jest.mock("Animated", () => ({
      createTimer: jest.fn(),
      timing: jest.fn(() => ({
        start: jest.fn()
      })),
      Value: jest.fn(() => ({
        interpolate: jest.fn()
      }))
    }));

    const component = new ShadowedScrollView();
    component.topShadowOpacity = { value: 1 };
    component.fadeBottomShadow(1);
    expect(Animated.timing).toBeCalledWith(
      { value: 1 },
      {
        duration: 100,
        toValue: 1,
        useNativeDriver: true
      }
    );
  });
});

describe("#handleScrollViewLayout", () => {
  it("saves the height of the element", () => {
    const component = new ShadowedScrollView();
    component.handleScrollViewLayout({
      nativeEvent: { layout: { height: 100 } }
    });
    expect(component.scrollViewHeight).toEqual(100);
  });
});

describe("#handleContentViewLayout", () => {
  it("saves the height of the element", () => {
    const component = new ShadowedScrollView();
    component.handleContentViewLayout({
      nativeEvent: { layout: { height: 100 } }
    });
    expect(component.contentViewHeight).toEqual(100);
  });
});

describe("#handleScroll", () => {
  it("hides the top shadow when we scrolled to the top", () => {
    const component = new ShadowedScrollView();
    component.contentViewHeight = 1000;
    component.scrollViewHeight = 500;
    component.isTopShadowPresent = true;
    component.fadeTopShadow = jest.fn();
    component.handleScroll({ nativeEvent: { contentOffset: { y: -10 } } });
    expect(component.fadeTopShadow).toBeCalledWith(0);
  });

  it("does not hide the top shadow when it is already hidden", () => {
    const component = new ShadowedScrollView();
    component.contentViewHeight = 1000;
    component.scrollViewHeight = 500;
    component.isTopShadowPresent = false;
    component.fadeTopShadow = jest.fn();
    component.handleScroll({ nativeEvent: { contentOffset: { y: -10 } } });
    expect(component.fadeTopShadow).not.toBeCalled();
  });

  it("shows the top shadow when we scrolled away from the top", () => {
    const component = new ShadowedScrollView();
    component.contentViewHeight = 1000;
    component.scrollViewHeight = 500;
    component.isTopShadowPresent = false;
    component.fadeTopShadow = jest.fn();
    component.handleScroll({ nativeEvent: { contentOffset: { y: 1 } } });
    expect(component.fadeTopShadow).toBeCalledWith(1);
  });

  it("does not show the top shadow when it is already showing", () => {
    const component = new ShadowedScrollView();
    component.contentViewHeight = 1000;
    component.scrollViewHeight = 500;
    component.isTopShadowPresent = true;
    component.fadeTopShadow = jest.fn();
    component.handleScroll({ nativeEvent: { contentOffset: { y: 1 } } });
    expect(component.fadeTopShadow).not.toBeCalled();
  });

  it("hides the bottom shadow when we scrolled to the bottom", () => {
    const component = new ShadowedScrollView();
    component.contentViewHeight = 1000;
    component.scrollViewHeight = 500;
    component.isBottomShadowPresent = true;
    component.fadeBottomShadow = jest.fn();
    component.handleScroll({ nativeEvent: { contentOffset: { y: 1010 } } });
    expect(component.fadeBottomShadow).toBeCalledWith(0);
  });

  it("does not hide the bottom shadow when it is already hidden", () => {
    const component = new ShadowedScrollView();
    component.contentViewHeight = 1000;
    component.scrollViewHeight = 500;
    component.isBottomShadowPresent = false;
    component.fadeBottomShadow = jest.fn();
    component.handleScroll({ nativeEvent: { contentOffset: { y: 1010 } } });
    expect(component.fadeBottomShadow).not.toBeCalled();
  });

  it("shows the bottom shadow when we scrolled away from the bottom", () => {
    const component = new ShadowedScrollView();
    component.contentViewHeight = 1000;
    component.scrollViewHeight = 500;
    component.isBottomShadowPresent = false;
    component.fadeBottomShadow = jest.fn();
    component.handleScroll({ nativeEvent: { contentOffset: { y: 100 } } });
    expect(component.fadeBottomShadow).toBeCalledWith(1);
  });

  it("does not show the bottom shadow when it is already showing", () => {
    const component = new ShadowedScrollView();
    component.contentViewHeight = 1000;
    component.scrollViewHeight = 500;
    component.isBottomShadowPresent = true;
    component.fadeBottomShadow = jest.fn();
    component.handleScroll({ nativeEvent: { contentOffset: { y: 100 } } });
    expect(component.fadeBottomShadow).not.toBeCalled();
  });
});
