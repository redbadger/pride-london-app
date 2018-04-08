// @flow
import React from "react";
import { shallow } from "enzyme";
import { Linking } from "react-native";
import Button from "./Button";

let openURLSpy;
beforeEach(() => {
  openURLSpy = jest
    .spyOn(Linking, "openURL")
    .mockImplementation(() => Promise.resolve());
});

afterEach(() => {
  openURLSpy.mockRestore();
});

it("renders correctly", () => {
  const output = shallow(<Button text="a button" />);
  expect(output).toMatchSnapshot();
});

it("calls press handler on press", () => {
  const onPress = jest.fn();
  const output = shallow(<Button text="a button" onPress={onPress} />);

  output.simulate("press");

  expect(onPress).toHaveBeenCalled();
});

it("opens url when provided", () => {
  const url = "some-url";
  const output = shallow(<Button text="a button" url={url} />);

  output.simulate("press");

  expect(openURLSpy).toHaveBeenCalledWith(url);
});
