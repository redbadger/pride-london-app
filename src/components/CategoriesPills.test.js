// @flow
import React from "react";
import { shallow } from "enzyme";
import * as colors from "../constants/colors";

import CategoriesPills from "./CategoriesPills";

const render = props => shallow(<CategoriesPills {...props} />);

describe("CategoriesPills Component", () => {
  it("renders correctly", () => {
    expect(render({ selectedCategories: new Set() })).toMatchSnapshot();
  });

  it("renders no pills", () => {
    const output = render({ selectedCategories: new Set() });
    const noCategoriesText = output.find("Text").props().children;

    expect(noCategoriesText).toEqual("0 selected");
  });

  it("renders categories pills", () => {
    const selectedCategories: Set<string> = new Set(["Music", "Community"]);
    const output = render({ selectedCategories });
    const categoriesPills = output.find("ScrollView").children();

    expect(categoriesPills.length).toEqual(selectedCategories.size);
  });

  it("renders pills with the category color", () => {
    const expectedColor = colors.brightLightBlueColor;
    const selectedCategories: Set<string> = new Set(["Community"]);
    const output = render({ selectedCategories });

    const pillCustomStyles = output
      .find("CategoryPill")
      .dive()
      .prop("style")[1];

    expect(pillCustomStyles.backgroundColor).toEqual(expectedColor);
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
});
