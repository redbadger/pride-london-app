// @flow
import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import Collapsible from "./Collapsible";

it("renders correctly", () => {
  const output = shallow(
    <Collapsible>
      <Text>Hello</Text>
    </Collapsible>
  );

  expect(output).toMatchSnapshot();
});
