// @flow
import React from "react";
import { shallow } from "enzyme";
import FilterHeader from "./FilterHeader";

it("renders correctly", () => {
  const output = shallow(<FilterHeader />);
  expect(output).toMatchSnapshot();
});
