import React from "react";
import { shallow } from "enzyme";
import ActionButton from "./ActionButton";

it("renders correctly", () => {
  const output = shallow(<ActionButton label="some action" />);
  expect(output).toMatchSnapshot();
});

it("renders with optional props", () => {
  const output = shallow(
    <ActionButton label="some action" onPress={() => {}} style={{}} />
  );
  expect(output).toMatchSnapshot();
});
