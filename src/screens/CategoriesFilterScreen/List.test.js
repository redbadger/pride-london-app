// @flow
import React from "react";
import { shallow } from "enzyme";
import List from "./List";

const render = props => shallow(<List {...props} />);

describe("List Component", () => {
  it("renders correctly", () => {
    const stagedCategories: Set<string> = new Set(["Music"]);
    const onPress = () => {};
    const component = render({ locale: "en-GB", stagedCategories, onPress });

    expect(component).toMatchSnapshot();
  });
});
