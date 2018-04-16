import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";

it("renders correctly", () => {
  const output = shallow(
    <Header onClearPress={() => {}} onCancelPress={() => {}} />
  );
  expect(output).toMatchSnapshot();
});
