import React from "react";
import { shallow } from "enzyme";
import ParadeNavigator from "./component";

it("renders correctly", () => {
  const output = shallow(<ParadeNavigator />);
  expect(output).toMatchSnapshot();
});
