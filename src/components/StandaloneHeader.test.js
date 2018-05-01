import React from "react";
import { shallow } from "enzyme";
import StandaloneHeader from "./StandaloneHeader";

it("renders correctly", () => {
  const output = shallow(<StandaloneHeader title="funky town" />);
  expect(output).toMatchSnapshot();
});
