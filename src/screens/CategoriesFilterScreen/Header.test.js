// @flow
import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";

const render = props => shallow(<Header {...props} />);

describe("Header Component", () => {
  it("renders correctly", () => {
    const output = render({ selectedCategories: new Set() });
    expect(output).toMatchSnapshot();
  });

  it("does not render clear all button if there are no selected categories", () => {
    const output = render({ selectedCategories: new Set() });

    expect(output.find('ActionButton[label="Clear All"]').length).toEqual(0);
  });

  it("render clear all button if there are selected categories", () => {
    const output = render({ selectedCategories: new Set(["Community"]) });

    expect(output.find('ActionButton[label="Clear all"]').length).toEqual(1);
  });
});
