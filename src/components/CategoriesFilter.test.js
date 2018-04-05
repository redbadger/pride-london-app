// @flow
import React from "react";
import { shallow } from "enzyme";
import CategoriesFilter from "./CategoriesFilter";
import type { EventCategory } from "../data/event";

const render = props => shallow(<CategoriesFilter {...props} />);

describe("CategoriesFilter Component", () => {
  it("renders correctly", () => {
    const category: EventCategory = { label: "Music", color: "#ffffff" };
    const component = render({ category, selected: true });

    expect(component).toMatchSnapshot();
  });
});
