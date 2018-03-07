// @flow
import React from "react";
import { shallow } from "enzyme";
import Text from "./Text";

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

it("passes custom styles down to component", () => {
  const style = { fontSize: 300 };
  const output = shallow(<Text style={style}>Some text</Text>);

  expect(output.props().style[output.props().style.length - 1]).toBe(style);
});
