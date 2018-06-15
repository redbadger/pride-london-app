// @flow
import React from "react";
import { shallow } from "enzyme";
import ResetAllFiltersButton from "./ResetAllFiltersButton";

it("renders correctly", () => {
  const output = shallow(<ResetAllFiltersButton visible onPress={() => {}} />);
  expect(output).toMatchSnapshot();
});
