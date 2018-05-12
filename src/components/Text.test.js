// @flow
import React from "react";
import { PixelRatio } from "react-native";
import { shallow } from "enzyme";
import Markdown from "react-native-easy-markdown";
import Text, { cap } from "./Text";
import { lightNavyBlueColor } from "../constants/colors";

let getFontScaleSpy;
beforeEach(() => {
  getFontScaleSpy = jest.spyOn(PixelRatio, "getFontScale");
});

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

describe("cap", () => {
  it(`creates rendered font size of 6 for input (12, 14) and font scale 0.5`, () => {
    getFontScaleSpy.mockReturnValue(0.5);
    expect(cap(12, 14) * 0.5).toBe(6);
  });

  it(`creates rendered font size of 12 for input (12, 14) and font scale 1`, () => {
    getFontScaleSpy.mockReturnValue(1);
    expect(cap(12, 14) * 1).toBe(12);
  });

  it(`creates rendered font size of 13.2 for input (12, 14) and font scale 1.1`, () => {
    getFontScaleSpy.mockReturnValue(1.1);
    expect(cap(12, 14) * 1.1).toBeCloseTo(13.2, 5);
  });

  it(`creates rendered font size of 14 for input (12, 14) and font scale 1.5`, () => {
    getFontScaleSpy.mockReturnValue(1.5);
    expect(cap(12, 14) * 1.5).toBe(14);
  });
});

afterEach(() => {
  getFontScaleSpy.mockRestore();
});
