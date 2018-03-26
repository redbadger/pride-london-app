// @flow
import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import Touchable from "./Touchable.ios";

it("renders correctly", () => {
  const style = { borderRadius: 2 };
  const output = shallow(
    <Touchable style={style}>
      <Text>Hello</Text>
    </Touchable>
  );
  expect(output).toMatchSnapshot();
});
