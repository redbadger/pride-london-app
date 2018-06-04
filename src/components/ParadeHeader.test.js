// @flow
import React from "react";
import { shallow } from "enzyme";
import ParadeHeader from "./ParadeHeader";

it("renders correctly", () => {
  const output = shallow(<ParadeHeader />);
  expect(output).toMatchSnapshot();
});
