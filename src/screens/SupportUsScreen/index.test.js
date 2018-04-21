// @flow
import React from "react";
import { shallow } from "enzyme";
import SupportUsScreen from ".";

it("renders correctly", () => {
  const output = shallow(<SupportUsScreen navigation={null} />);
  expect(output).toMatchSnapshot();
});
