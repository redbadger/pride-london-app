// @flow
import React from "react";
import { shallow } from "enzyme";
import ListItem from "./ListItem";
import type { EventCategory } from "../../data/event";

const render = props => shallow(<ListItem {...props} />);

describe("ListItem Component", () => {
  it("renders correctly", () => {
    const category: EventCategory = { label: "Music", color: "#ffffff" };
    const component = render({ category, selected: true });

    expect(component).toMatchSnapshot();
  });
});
