// @flow
import React from "react";
import { shallow } from "enzyme";
import FilterHeaderButton from "./FilterHeaderButton";

it("renders correctly", () => {
  const style = { marginTop: 16 };
  const output = shallow(
    <FilterHeaderButton
      active
      text="1-2-3 filtered"
      label="1-2-3 filtered"
      style={style}
      onPress={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders badge value when provided", () => {
  const style = { marginTop: 16 };
  const output = shallow(
    <FilterHeaderButton
      active
      text="1-2-3 filtered"
      label="1-2-3 filtered"
      style={style}
      onPress={() => {}}
      badgeValue={2}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders correct styles when inactive", () => {
  const style = { marginTop: 16 };
  const output = shallow(
    <FilterHeaderButton
      active={false}
      text="1-2-3 filtered"
      label="One two three filtered"
      style={style}
      onPress={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});
