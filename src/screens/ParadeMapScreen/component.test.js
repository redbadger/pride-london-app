// @flow
import React from "react";
import { shallow } from "enzyme";
import ParadeMapScreen from "./component";

it("renders correctly", () => {
  const output = shallow(<ParadeMapScreen isFocused />);
  expect(output).toMatchSnapshot();
});

it("does not render map when not focused", () => {
  const output = shallow(<ParadeMapScreen />);
  expect(output).toMatchSnapshot();
});
