// @flow
import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import IconItem from "./IconItem";

it("renders correctly", () => {
  const output = shallow(
    <IconItem source={{ uri: "/super-awesome-image.jpg" }}>
      <Text type="h4">some thing</Text>
    </IconItem>
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly when passed an onPress handler", () => {
  const output = shallow(
    <IconItem onPress={() => {}} source={{ uri: "/super-awesome-image.jpg" }}>
      <Text type="h4">some thing</Text>
    </IconItem>
  );
  expect(output).toMatchSnapshot();
});
