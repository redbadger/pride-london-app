// @flow
import React from "react";
import { shallow } from "enzyme";
import { View } from "react-native";
import LayoutColumn from "./Shadow";

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
