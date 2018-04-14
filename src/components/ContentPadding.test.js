// @flow
import React from "react";
import { Text, Dimensions } from "react-native";
import { shallow } from "enzyme";
import ContentPadding from "./ContentPadding";

describe("ContentPadding", () => {
  it("renders correctly", () => {
    expect(
      shallow(
        <ContentPadding>
          <Text>Something</Text>
        </ContentPadding>
      )
    ).toMatchSnapshot();
  });

  it("adds small padding for small devices", () => {
    const dimensionsMock = jest
      .spyOn(Dimensions, "get")
      .mockImplementation(() => ({ width: 320 }));

    const output = shallow(
      <ContentPadding>
        <Text>Something</Text>
      </ContentPadding>
    );

    expect(output.props().style[0].paddingHorizontal).toBe(8);

    dimensionsMock.mockRestore();
  });

  it("adds large padding for large devices", () => {
    const dimensionsMock = jest
      .spyOn(Dimensions, "get")
      .mockImplementation(() => ({ width: 360 }));

    const output = shallow(
      <ContentPadding>
        <Text>Something</Text>
      </ContentPadding>
    );

    expect(output.props().style[0].paddingHorizontal).toBe(16);

    dimensionsMock.mockRestore();
  });

  it("adds no padding on landscape (very large width)", () => {
    const dimensionsMock = jest
      .spyOn(Dimensions, "get")
      .mockImplementation(() => ({ width: 441 }));

    const output = shallow(
      <ContentPadding>
        <Text>Something</Text>
      </ContentPadding>
    );

    expect(output.props().style[0].paddingHorizontal).toBeUndefined();

    dimensionsMock.mockRestore();
  });
});
