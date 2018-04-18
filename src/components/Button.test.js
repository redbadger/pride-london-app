// @flow
import React from "react";
import { Linking } from "react-native";
import { shallow } from "enzyme";
import Button, { handlePress } from "./Button";

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

it("applies styles and props when disabled=true", () => {
  const output = shallow(<Button text="a button" disabled />);
  expect(output).toMatchSnapshot();
});

describe("#handlePress", () => {
  it("does nothing, if there is no url provided", () => {
    jest.mock("Linking", () => ({ openURL: jest.fn() }));
    handlePress();
    expect(Linking.openURL).not.toBeCalled();
  });

  it("opens the url, if there is one", () => {
    jest.mock("Linking", () => ({ openURL: jest.fn() }));
    handlePress(() => {}, "url");
    expect(Linking.openURL).toBeCalledWith("url");
  });
});
