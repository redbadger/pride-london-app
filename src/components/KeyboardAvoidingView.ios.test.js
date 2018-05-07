// @flow
import React from "react";
import { shallow } from "enzyme";
import KeyboardAvoidingView from "./KeyboardAvoidingView.ios";

it("renders correctly", () => {
  const style = { borderRadius: 2 };
  const output = shallow(
    <KeyboardAvoidingView style={style}>Hello</KeyboardAvoidingView>
  );
  expect(output).toMatchSnapshot();
});
