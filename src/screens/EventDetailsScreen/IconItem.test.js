// @flow
import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import IconItem from "./IconItem";

it("renders correctly", () => {
  const output = shallow(
    <IconItem icon={<Text>Some icon</Text>} title="some thing" />
  );
  expect(output).toMatchSnapshot();
});

it("renders content", () => {
  const output = shallow(
    <IconItem
      icon={<Text>Some icon</Text>}
      title="some thing"
      content={<Text>Some child</Text>}
    />
  );

  const texts = output.find("Text");

  const hasChild = texts.someWhere(
    element => element.children().text() === "Some child"
  );

  expect(hasChild).toBe(true);
});

it("passes titleType to title", () => {
  const output = shallow(
    <IconItem icon={<Text>Some icon</Text>} title="some thing" titleType="h1" />
  );

  const texts = output.find("Text");

  const hasType = texts.someWhere(element => element.props().type === "h1");

  expect(hasType).toBe(true);
});
