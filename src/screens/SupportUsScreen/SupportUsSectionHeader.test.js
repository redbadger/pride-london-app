// @flow
import React from "react";
import { shallow } from "enzyme";
import SupportUsSectionHeader from "./SupportUsSectionHeader";

it("renders correctly", () => {
  const output = shallow(<SupportUsSectionHeader image={0} title="Fruit" />);
  expect(output).toMatchSnapshot();
});
