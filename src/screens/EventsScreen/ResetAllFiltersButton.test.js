// @flow
import React from "react";
import { shallow } from "enzyme";
import ResetAllFiltersButton from "./ResetAllFiltersButton";
import FilterHeaderButton from "./FilterHeaderButton";

const noOp = () => {};

it("renders correctly", () => {
  const output = shallow(<ResetAllFiltersButton visible onPress={noOp} />);
  expect(output).toMatchSnapshot();
});

it("does not render when visible=false", () => {
  const output = shallow(
    <ResetAllFiltersButton visible={false} onPress={noOp} />
  );
  expect(output).toMatchSnapshot();
});

it("calls onPress method when pressed", () => {
  const onPress = jest.fn();
  const output = shallow(
    <ResetAllFiltersButton
      visible
      onPress={onPress}
      animationTime={0}
      animationDelay={0}
    />
  );

  output
    .find(FilterHeaderButton)
    .props()
    .onPress();

  expect(onPress).toHaveBeenCalled();
});
