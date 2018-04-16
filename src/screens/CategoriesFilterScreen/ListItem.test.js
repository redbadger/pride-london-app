// @flow
import React from "react";
import { View } from "react-native";
import { shallow } from "enzyme";
import ListItem from "./ListItem";
import type { EventCategory } from "../../data/event";

const render = props => shallow(<ListItem {...props} />);

describe("ListItem Component", () => {
  beforeEach(() => {
    jest.mock("NativeAnimatedHelper");
  });

  it("renders correctly", () => {
    const category: EventCategory = {
      label: "Music",
      color: "#ffffff",
      contrast: true
    };
    const component = render({ category, selected: true });

    expect(component).toMatchSnapshot();
  });

  it("renders correctly without selected", () => {
    const category: EventCategory = {
      label: "Music",
      color: "#ffffff",
      contrast: true
    };
    const component = render({ category, selected: false });

    expect(component).toMatchSnapshot();
  });

  describe("#handleOnLayout", () => {
    it("stores the height and width of the component", () => {
      const category: EventCategory = {
        label: "Music",
        color: "#ffffff",
        contrast: true
      };
      const component = render({ category, selected: false });
      component
        .find(View)
        .props()
        .onLayout({
          nativeEvent: { layout: { width: 100, height: 200 } }
        });
      expect(component.state("textWidth")).toEqual(100);
      expect(component.state("textHeight")).toEqual(200);
    });
  });
});
