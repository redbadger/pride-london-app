// @flow
import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import IconItem from "./IconItem";
import IconList from "./IconList";

it("renders correctly", () => {
  const output = shallow(
    <IconList>
      <IconItem source={{ uri: "/super-awesome-image.jpg" }}>
        <Text type="h4">some thing</Text>
      </IconItem>
      <IconItem onPress={() => {}} source={{ uri: "/super-awesome-image.jpg" }}>
        <Text type="h4">some thing</Text>
      </IconItem>
    </IconList>
  );
  expect(output).toMatchSnapshot();
});
