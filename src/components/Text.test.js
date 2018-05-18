// @flow
import React from "react";
import { PixelRatio } from "react-native";
import { shallow } from "enzyme";
import Markdown from "react-native-easy-markdown";
import Text, { scaleFont, scaleWithFont } from "./Text";
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

describe("scaleFont", () => {
  it("returns default font size for smaller scale", () => {
    getFontScaleSpy.mockReturnValue(0.5);
    expect(scaleFont("text", 12)).toBe(12);
  });

  it("returns default font size for default scale", () => {
    getFontScaleSpy.mockReturnValue(1);
    expect(scaleFont("text", 12)).toBe(12);
  });

  it("returns default font size for larger (but still below max) scale", () => {
    getFontScaleSpy.mockReturnValue(1.1);
    expect(scaleFont("text", 12)).toBe(12);
  });

  it("returns reduced font size for larger than max scale", () => {
    getFontScaleSpy.mockReturnValue(1.5);
    expect(scaleFont("text", 12)).toBe(10);
  });
});

describe("scaleWithFont", () => {
  it("returns reduced size for smaller scale", () => {
    getFontScaleSpy.mockReturnValue(0.5);
    expect(scaleWithFont("text", 12)).toBe(6);
  });

  it("returns default size for default scale", () => {
    getFontScaleSpy.mockReturnValue(1);
    expect(scaleWithFont("text", 12)).toBe(12);
  });

  it("returns increased size for larger (but still below max) scale", () => {
    getFontScaleSpy.mockReturnValue(1.1);
    expect(scaleWithFont("text", 12)).toBeCloseTo(13.2, 5);
  });

  it("returns max size for larger than max scale", () => {
    getFontScaleSpy.mockReturnValue(1.5);
    expect(scaleWithFont("text", 12)).toBe(15);
  });
});

afterEach(() => {
  getFontScaleSpy.mockRestore();
});
