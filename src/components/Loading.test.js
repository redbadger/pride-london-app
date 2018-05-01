import React from "react";
import { shallow } from "enzyme";
import Loading from "./Loading";

it("renders correctly", () => {
  const output = shallow(<Loading />);
  expect(output).toMatchSnapshot();
});
