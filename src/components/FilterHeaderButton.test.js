// @flow
import React from "react";
import { shallow } from "enzyme";
import FilterHeaderButton from "./FilterHeaderButton";

it("renders correctly", () => {
  const style = { marginTop: 16 };
  const output = shallow(
    <FilterHeaderButton
      text="1-2-3 filtered"
      label="One two three filtered"
      style={style}
      onPress={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});
