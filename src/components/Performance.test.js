// @flow
import React from "react";
import { shallow } from "enzyme";
import Performance from "./Performance";

it("renders correctly", () => {
  const output = shallow(
    <Performance startTime="12:00" title="DJ Bag-o-Donuts" />
  );
  expect(output).toMatchSnapshot();
});
