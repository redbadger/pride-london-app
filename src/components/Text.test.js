// @flow
import React from "react";
import { shallow } from "enzyme";
import Markdown from "react-native-easy-markdown";
import Text from "./Text";
import { lightNavyBlueColor } from "../constants/colors";

it("renders correctly", () => {
  const output = shallow(<Text>Some text</Text>);
  expect(output).toMatchSnapshot();
});

it("renders text based on type", () => {
  const output = shallow(<Text type="h1">Some text</Text>);

  expect(output.props().style[0]).toEqual(
    expect.objectContaining({ fontFamily: "Poppins-Bold" })
  );
});

it("renders markdown component based on flag", () => {
  const output = shallow(<Text markdown>**Some markdown**</Text>);

  expect(output).toMatchSnapshot();
});

it("does not render markdown images", () => {
  const output = shallow(
    <Text markdown>![Test](https://placehold.it/320x320.png)</Text>
  );
  const markdown = output.find(Markdown).shallow();
  console.log(markdown);
  expect(markdown).toMatchSnapshot();
});

it("passes custom styles down to component", () => {
  const style = { fontSize: 300 };
  const output = shallow(<Text style={style}>Some text</Text>);

  expect(output.props().style).toContainEqual(style);
});

it("renders text in blue when color is set", () => {
  const style = { color: lightNavyBlueColor };
  const output = shallow(<Text color="lightNavyBlueColor">Some text</Text>);

  expect(output.props().style).toContainEqual(style);
});
