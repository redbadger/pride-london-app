// @flow
import React from "react";
import { shallow } from "enzyme";
import CheckBox from "./CheckBox";

it("renders correctly", () => {
  const output = shallow(
    <CheckBox checked={false} onChange={() => {}} label="Bananas" />
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly when checked", () => {
  const output = shallow(
    <CheckBox checked onChange={() => {}} label="Bananas" />
  );
  expect(output).toMatchSnapshot();
});
