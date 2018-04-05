// @flow
import React from "react";
import { shallow } from "enzyme";
import CategoriesPills from "./CategoriesPills";

const render = props => shallow(<CategoriesPills {...props} />);

describe("CategoriesPills Component", () => {
  it("renders correctly", () => {
    expect(render({ selectedCategories: new Set() })).toMatchSnapshot();
  });

  it("renders no pills", () => {
    const output = render({ selectedCategories: new Set() });
    expect(output.find("Text").props().children).toEqual("0 selected");
  });

  it("renders categories pills", () => {
    const selectedCategories: Set<string> = new Set(["Music", "Community"]);
    const output = render({ selectedCategories });

    expect(output.find("ScrollView").exists()).toEqual(true);
    expect(output.find("ScrollView").children().length).toEqual(
      selectedCategories.size
    );
  });
});
