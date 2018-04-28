// @flow
import React from "react";
import { shallow } from "enzyme";
import SegmentedControl from "./SegmentedControl";

it("renders correctly", () => {
  const output = shallow(
    <SegmentedControl
      onValueChange={() => {}}
      selectedIndex={0}
      values={["One", "Two", "Three"]}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly without selection", () => {
  const output = shallow(
    <SegmentedControl
      onValueChange={() => {}}
      selectedIndex={null}
      values={["One", "Two"]}
    />
  );
  expect(output).toMatchSnapshot();
});

it("invokes onValueChange on button press", () => {
  const onValueChange = jest.fn();
  const output = shallow(
    <SegmentedControl
      onValueChange={onValueChange}
      selectedIndex={0}
      values={["One", "Two", "Three"]}
    />
  );

  output.find({ testID: "button-1" }).simulate("press");
  expect(onValueChange).toHaveBeenCalledWith("Two");
});
