// @flow
import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import Delayed from "./Delayed";

jest.useFakeTimers();

it("renders correctly", () => {
  const output = shallow(
    <Delayed delay={200}>
      <Text>Hello World!</Text>
    </Delayed>
  );
  jest.runAllTimers();
  expect(output).toMatchSnapshot();
});
