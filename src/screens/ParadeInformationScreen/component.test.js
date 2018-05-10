// @flow
import React from "react";
import { shallow } from "enzyme";
import ParadeInformationScreen from "./component";

it("renders correctly", () => {
  const output = shallow(<ParadeInformationScreen />);
  expect(output).toMatchSnapshot();
});
