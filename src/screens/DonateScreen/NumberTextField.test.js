// @flow
import React from "react";
import { TextInput } from "react-native";
import { shallow } from "enzyme";
import NumberTextField from "./NumberTextField";

it("renders correctly", () => {
  const output = shallow(
    <NumberTextField
      label="A number"
      placeholder="0"
      onFocus={() => {}}
      onChangeText={() => {}}
      value="13.37"
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders placeholder when focused", () => {
  const onFocus = jest.fn();
  const output = shallow(
    <NumberTextField
      label="A number"
      placeholder="0.00"
      onFocus={onFocus}
      onChangeText={() => {}}
      value={null}
    />
  );

  expect(output.find(TextInput).prop("placeholder")).toBe(null);
  output.find(TextInput).simulate("focus");
  expect(onFocus).toHaveBeenCalled();
  expect(output.find(TextInput).prop("placeholder")).toBe("0.00");
  output.find(TextInput).simulate("blur");
  expect(output.find(TextInput).prop("placeholder")).toBe(null);
});
