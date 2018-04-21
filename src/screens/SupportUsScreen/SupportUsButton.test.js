// @flow
import React from "react";
import { Linking } from "react-native";
import { shallow } from "enzyme";
import SupportUsButton from "./SupportUsButton";

let openURLSpy;
beforeEach(() => {
  openURLSpy = jest
    .spyOn(Linking, "openURL")
    .mockImplementation(() => Promise.resolve());
});

it("renders correctly", () => {
  const output = shallow(
    <SupportUsButton
      color="red"
      title="Fruit..."
      description="Apples, Bananas, Tomatos"
      navigation={null}
      url="https://example.com"
    />
  );
  expect(output).toMatchSnapshot();
});

it("picks different icon for external links", () => {
  const output = shallow(
    <SupportUsButton
      color="red"
      title="Fruit..."
      description="Apples, Bananas, Tomatos"
      navigation={null}
      url="https://example.com"
      isExternalLink
    />
  );
  expect(output).toMatchSnapshot();
});

it("picks different icon for external links with contrast color", () => {
  const output = shallow(
    <SupportUsButton
      color="red"
      title="Fruit..."
      description="Apples, Bananas, Tomatos"
      navigation={null}
      url="https://example.com"
      isExternalLink
      contrast
    />
  );
  expect(output).toMatchSnapshot();
});

it("navigates to route onPress", () => {
  const navigation = {
    navigate: jest.fn()
  };
  const output = shallow(
    <SupportUsButton
      color="red"
      title="Fruit..."
      description="Apples, Bananas, Tomatos"
      navigation={navigation}
      url="DONATE"
    />
  );
  output.simulate("press");

  expect(navigation.navigate).toHaveBeenCalledWith("DONATE");
});

it("navigates to external link onPress", () => {
  const output = shallow(
    <SupportUsButton
      color="red"
      title="Fruit..."
      description="Apples, Bananas, Tomatos"
      navigation={null}
      url="https://example.com"
      isExternalLink
    />
  );
  output.simulate("press");

  expect(openURLSpy).toHaveBeenCalledWith("https://example.com");
});

afterEach(() => {
  openURLSpy.mockRestore();
});
