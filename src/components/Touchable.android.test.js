// @flow
import React from "react";
import { shallow } from "enzyme";
import Touchable from "./Touchable.android";

jest.mock("react-native", () => {
  const TouchableNativeFeedback = () => null;
  TouchableNativeFeedback.SelectableBackground = jest.fn(
    () => "mock background"
  );

  return {
    StyleSheet: {
      create: jest.fn(() => ({
        defaults: { color: "red" }
      }))
    },
    TouchableNativeFeedback,
    View: () => null
  };
});

jest.mock("react-native-accessible-selectable", () => ({
  makeSelectable: jest.fn(Component => Component)
}));

it("renders correctly", () => {
  const style = { borderRadius: 2 };
  const output = shallow(<Touchable style={style}>Hello</Touchable>);
  expect(output).toMatchSnapshot();
});
