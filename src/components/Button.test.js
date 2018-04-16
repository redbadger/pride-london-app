// @flow
import React from "react";
import { Linking } from "react-native";
import { shallow } from "enzyme";
import Button, { onPress } from "./Button";

it("renders correctly", () => {
  const output = shallow(<Button text="a button" />);
  expect(output).toMatchSnapshot();
});

describe("#onPress", () => {
  it("does nothing, if there is no url provided", () => {
    jest.mock("Linking", () => ({ openURL: jest.fn() }));
    onPress();
    expect(Linking.openURL).not.toBeCalled();
  });

  it("opens the url, if there is one", () => {
    jest.mock("Linking", () => ({ openURL: jest.fn() }));
    onPress("url");
    expect(Linking.openURL).toBeCalledWith("url");
  });
});
