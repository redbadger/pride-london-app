// @flow
import React from "react";
import { shallow } from "enzyme";
import NumberBadge from "./NumberBadge";

it("renders correctly", () => {
  const output = shallow(<NumberBadge value={1} />);
  expect(output).toMatchSnapshot();
});
