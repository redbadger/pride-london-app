// @flow
import React from "react";
import { Text, Dimensions } from "react-native";
import { shallow } from "enzyme";
import ScreenSizeProvider from "./ScreenSizeProvider";

let dimensionsGetMock;
let dimensionsAddEventListenerMock;
let dimensionsRemoveEventListenerMock;
beforeEach(() => {
  dimensionsGetMock = jest.spyOn(Dimensions, "get");
  dimensionsAddEventListenerMock = jest.spyOn(Dimensions, "addEventListener");
  dimensionsRemoveEventListenerMock = jest.spyOn(
    Dimensions,
    "removeEventListener"
  );
});

describe("ScreenSizeProvider", () => {
  it("renders with small size", () => {
    dimensionsGetMock.mockImplementation(() => ({ width: 320 }));

    const output = shallow(
      <ScreenSizeProvider>{size => <Text>{size}</Text>}</ScreenSizeProvider>
    );

    expect(
      output
        .find(Text)
        .children()
        .text()
    ).toBe("small");
  });

  it("renders with medium size", () => {
    dimensionsGetMock.mockImplementation(() => ({ width: 360 }));

    const output = shallow(
      <ScreenSizeProvider>{size => <Text>{size}</Text>}</ScreenSizeProvider>
    );

    expect(
      output
        .find(Text)
        .children()
        .text()
    ).toBe("medium");
  });

  it("renders with large size", () => {
    dimensionsGetMock.mockImplementation(() => ({ width: 441 }));

    const output = shallow(
      <ScreenSizeProvider>{size => <Text>{size}</Text>}</ScreenSizeProvider>
    );

    expect(
      output
        .find(Text)
        .children()
        .text()
    ).toBe("large");
  });

  it("rerenders when dimensions change", () => {
    dimensionsGetMock
      .mockReturnValueOnce({ width: 100 })
      .mockReturnValueOnce({ width: 600 });

    const output = shallow(
      <ScreenSizeProvider>{size => <Text>{size}</Text>}</ScreenSizeProvider>
    );

    expect(output.state("size")).toBe("small");
    expect(dimensionsAddEventListenerMock).toHaveBeenCalledTimes(1);

    const listener = dimensionsAddEventListenerMock.mock.calls[0][1];
    listener();

    expect(output.state("size")).toBe("large");

    output.unmount();

    expect(dimensionsRemoveEventListenerMock).toHaveBeenCalledTimes(1);
  });
});

afterEach(() => {
  dimensionsGetMock.mockRestore();
  dimensionsAddEventListenerMock.mockRestore();
  dimensionsRemoveEventListenerMock.mockRestore();
});
