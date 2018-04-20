// @flow
import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import ContentPadding from "./ContentPadding";
import ScreenSizeProvider from "./ScreenSizeProvider";

jest.mock("./ScreenSizeProvider", () => jest.fn());

const ScreenSizeProviderMock: any = ScreenSizeProvider;

describe("ContentPadding", () => {
  it("adds small padding for small devices", () => {
    ScreenSizeProviderMock.mockImplementation(({ children }) =>
      children("small")
    );

    const output = shallow(
      <ContentPadding>
        <Text>Something</Text>
      </ContentPadding>
    ).dive();

    expect(output.prop("style")[0].paddingHorizontal).toBe(8);
  });

  it("adds medium padding for medium devices", () => {
    ScreenSizeProviderMock.mockImplementation(({ children }) =>
      children("medium")
    );

    const output = shallow(
      <ContentPadding>
        <Text>Something</Text>
      </ContentPadding>
    ).dive();

    expect(output.prop("style")[0].paddingHorizontal).toBe(16);
  });

  it("adds no padding on landscape (very large width)", () => {
    ScreenSizeProviderMock.mockImplementation(({ children }) =>
      children("large")
    );

    const output = shallow(
      <ContentPadding>
        <Text>Something</Text>
      </ContentPadding>
    ).dive();

    expect(output.prop("style")[0].paddingHorizontal).toBe(0);
  });

  it("uses other padding when explicitly specified", () => {
    ScreenSizeProviderMock.mockImplementation(({ children }) =>
      children("large")
    );

    const output = shallow(
      <ContentPadding
        padding={{
          large: { horizontal: 19, vertical: 21 }
        }}
      >
        <Text>Something</Text>
      </ContentPadding>
    ).dive();

    expect(output.prop("style")[0].paddingHorizontal).toBe(19);
    expect(output.prop("style")[0].paddingVertical).toBe(21);
  });
});
