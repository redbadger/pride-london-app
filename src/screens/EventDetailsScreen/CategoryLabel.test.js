// @flow
import React from "react";
import { shallow } from "enzyme";
import CategoryLabel from "./CategoryLabel";

it("renders correctly", () => {
  const output = shallow(<CategoryLabel categoryName="music" />);
  expect(output).toMatchSnapshot();
});
