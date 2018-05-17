// @flow
import React from "react";
import { shallow } from "enzyme";
import SegmentedControl from "./SegmentedControl";

it("renders correctly", () => {
  const output = shallow(
    <SegmentedControl onValueChange={() => {}} selectedValue="One">
      <SegmentedControl.Item value="One" label="One" />
      <SegmentedControl.Item value="Two" label="Two" />
      <SegmentedControl.Item value="Three" label="Three" />
    </SegmentedControl>
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly without selection", () => {
  const output = shallow(
    <SegmentedControl onValueChange={() => {}} selectedValue={null}>
      <SegmentedControl.Item value="One" label="One" />
      <SegmentedControl.Item value="Two" label="Two" />
    </SegmentedControl>
  );
  expect(output).toMatchSnapshot();
});

it("invokes onValueChange on button press", () => {
  const onValueChange = jest.fn();
  const output = shallow(
    <SegmentedControl onValueChange={onValueChange} selectedValue="One">
      <SegmentedControl.Item value="One" label="One" />
      <SegmentedControl.Item value="Two" label="Two" />
    </SegmentedControl>
  );

  output.find({ testID: "button-1" }).simulate("press");
  expect(onValueChange).toHaveBeenCalledWith("Two");
});
