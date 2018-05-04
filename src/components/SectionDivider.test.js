// @flow
import React from "react";
import { shallow } from "enzyme";
import SectionDivider from "./SectionDivider";

it("renders correctly", () => {
  const output = shallow(<SectionDivider />);
  expect(output).toMatchSnapshot();
});
