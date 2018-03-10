// @flow
import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";

it("renders correctly", () => {
  const output = shallow(<Button text="a button" />);
  expect(output).toMatchSnapshot();
});
