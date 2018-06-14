// @flow
import React from "react";
import { shallow } from "enzyme";
import ParadeMapScreen from "./component";

it("renders correctly", () => {
  const output = shallow(<ParadeMapScreen navigation={null} />);
  expect(output).toMatchSnapshot();
});
