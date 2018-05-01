import React from "react";
import { shallow } from "enzyme";
import NoSavedEvents from "./NoSavedEvents";

it("renders correctly", () => {
  const output = shallow(<NoSavedEvents />);
  expect(output).toMatchSnapshot();
});
