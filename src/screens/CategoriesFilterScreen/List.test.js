// @flow
import React from "react";
import { shallow } from "enzyme";
import List from "./List";
import type { EventCategoryName } from "../../data/event";

const render = props => shallow(<List {...props} />);

describe("List Component", () => {
  it("renders correctly", () => {
    const stagedCategories: Set<EventCategoryName> = new Set(["Music"]);
    const onPress = () => {};
    const component = render({ stagedCategories, onPress });

    expect(component).toMatchSnapshot();
  });
});
