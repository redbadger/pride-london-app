// @flow
import React from "react";
import { shallow } from "enzyme";
import CategoriesPills from "./CategoriesPills";
import type { EventCategoryName } from "../data/event";

const render = props => shallow(<CategoriesPills {...props} />);

describe("CategoriesPills Component", () => {
  it("renders correctly", () => {
    expect(render({ selectedCategories: new Set() })).toMatchSnapshot();
  });

  it("renders no pills", () => {
    const output = render({ selectedCategories: new Set() });
    const noCategoriesText = output.find("Text").props().children;

    expect(noCategoriesText).toEqual("All events");
  });

  it("renders categories pills", () => {
    const selectedCategories: Set<EventCategoryName> = new Set([
      "Music",
      "Community"
    ]);
    const output = render({ selectedCategories });
    const categoriesPills = output.find("ScrollView").children();

    expect(categoriesPills.length).toEqual(selectedCategories.size);
  });

  describe("#scrollToLastPill", () => {
    it("scrolls to the end, if there is a scroll view", () => {
      const component = new CategoriesPills();
      const spy = jest.fn();
      component.scrollView = { scrollToEnd: spy };
      component.scrollToLastPill();
      expect(spy).toBeCalledWith({ animated: false });
    });

    it("does not scroll to the end, if there is no scroll view", () => {
      const component = new CategoriesPills();
      component.scrollView = undefined;
      expect(component.scrollToLastPill()).toBeUndefined();
    });
  });

  describe("touch handling", () => {
    it("triggers onPress when the user taps", () => {
      const onPress = jest.fn();
      const instance = render({
        onPress,
        selectedCategories: new Set()
      }).instance();

      instance.onTouchStart();
      instance.onTouchEnd();

      expect(onPress).toHaveBeenCalled();
    });

    it("does not trigger onPress when the user scrolls", () => {
      const onPress = jest.fn();
      const instance = render({
        onPress,
        selectedCategories: new Set()
      }).instance();

      instance.onTouchStart();
      instance.onScroll();
      instance.onTouchEnd();

      expect(onPress).not.toHaveBeenCalled();
    });
  });
});
