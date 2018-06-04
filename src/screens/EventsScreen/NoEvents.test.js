import React from "react";
import { shallow } from "enzyme";
import NoEvents from "./NoEvents";

it("renders correctly", () => {
  const output = shallow(<NoEvents />);
  expect(output).toMatchSnapshot();
});
