// @flow
import React from "react";
import { shallow } from "enzyme";
import { View } from "react-native";
import LayoutColumn from "./LayoutColumn";

it("renders correctly", () => {
  const output = shallow(
    <LayoutColumn spacing={16}>
      <View />
      <View />
      <View />
    </LayoutColumn>
  );
  expect(output).toMatchSnapshot();
});

it("does not wrap null components", () => {
  const output = shallow(
    <LayoutColumn spacing={16}>
      <View />
      {null}
      <View />
    </LayoutColumn>
  );
  expect(output).toMatchSnapshot();
});
