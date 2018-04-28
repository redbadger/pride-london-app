// @flow
import React from "react";
import { shallow } from "enzyme";
import SegmentedControl from "./SegmentedControl";

it("renders correctly", () => {
  const output = shallow(
    <SegmentedControl
      onSelectedIndexChange={() => {}}
      selectedIndex={0}
      values={["One", "Two", "Three"]}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly without selection", () => {
  const output = shallow(
    <SegmentedControl
      onSelectedIndexChange={() => {}}
      selectedIndex={null}
      values={["One", "Two"]}
    />
  );
  expect(output).toMatchSnapshot();
});

it("invokes onSelectedIndexChange on button press", () => {
  const onSelectedIndexChange = jest.fn();
  const output = shallow(
    <SegmentedControl
      onSelectedIndexChange={onSelectedIndexChange}
      selectedIndex={0}
      values={["One", "Two", "Three"]}
    />
  );

  output.find({ testID: "button-1" }).simulate("press");
  expect(onSelectedIndexChange).toHaveBeenCalledWith(1);
});
