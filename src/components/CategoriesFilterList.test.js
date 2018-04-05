// @flow
import React from "react";
import { shallow } from "enzyme";
import CategoriesFilterList from "./CategoriesFilterList";

const render = props => shallow(<CategoriesFilterList {...props} />);

describe("CategoriesFilterList Component", () => {
  it("renders correctly", () => {
    const stagedCategories: Set<string> = new Set(["Music"]);
    const onPress = () => {};
    const component = render({ locale: "en-GB", stagedCategories, onPress });

    expect(component).toMatchSnapshot();
  });
});
