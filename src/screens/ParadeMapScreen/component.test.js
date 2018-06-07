// @flow
import React from "react";
import { shallow } from "enzyme";
import { ParadeMap } from "./component";

it("renders correctly", () => {
  const output = shallow(<ParadeMap navigation={{ addListener: jest.fn() }} />);
  expect(output).toMatchSnapshot();
});
