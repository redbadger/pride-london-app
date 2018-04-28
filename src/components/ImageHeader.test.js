// @flow
import React from "react";
import { shallow } from "enzyme";
import ImageHeader from "./ImageHeader";

it("renders correctly", () => {
  const output = shallow(<ImageHeader image={0} title="Fruit" />);
  expect(output).toMatchSnapshot();
});
