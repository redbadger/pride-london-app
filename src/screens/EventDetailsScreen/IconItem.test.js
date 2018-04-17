// @flow
import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import IconItem from "./IconItem";

it("renders correctly", () => {
  const output = shallow(
    <IconItem icon={<Text>Some icon</Text>}>
      <Text type="h4">some thing</Text>
    </IconItem>
  );
  expect(output).toMatchSnapshot();
});
