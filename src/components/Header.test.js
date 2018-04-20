// @flow
import React from "react";
import { shallow } from "enzyme";
import { Text } from "react-native";
import Header from "./Header";

it("renders correctly", () => {
  const output = shallow(
    <Header>
      <Text>Lorem Ipsum</Text>
    </Header>
  );
  expect(output).toMatchSnapshot();
});
