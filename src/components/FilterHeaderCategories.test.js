// @flow
import React from "react";
import { shallow } from "enzyme";
import FilterHeaderCategories, {
  CategoriesFilterButton
} from "./FilterHeaderCategories";

const baseProps = {
  onFilterPress: () => {},
  selectedCategories: new Set()
};

describe("FilterHeaderCategories Component", () => {
  it("renders correctly", () => {
    const output = shallow(<FilterHeaderCategories {...baseProps} />);

    expect(output).toMatchSnapshot();
  });

  it("renders category pills with selected categories", () => {
    const categories = new Set(["Music"]);
    const output = shallow(
      <FilterHeaderCategories {...baseProps} selectedCategories={categories} />
    );

    expect(output.find("CategoriesPills").length).toEqual(1);
  });
});

describe("FilterHeaderCategories CategoriesFilterButton component", () => {
  it("renders correctly", () => {
    const output = shallow(<CategoriesFilterButton onPress={() => {}} />);

    expect(output).toMatchSnapshot();
  });
});
