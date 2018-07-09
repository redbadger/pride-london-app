// @flow
import React from "react";
import { shallow } from "enzyme";
import { sampleOne, generateImageDetails } from "../data/__test-data";
import { ImageBackground } from "./ImageBackground";

it("renders placeholder image correctly", () => {
  const getImageDetails = () => sampleOne(generateImageDetails);
  const reference = { sys: { id: "a" } };
  const output = shallow(
    <ImageBackground
      getImageDetails={getImageDetails}
      reference={reference}
      resizeMode="contain"
      accessibilityLabel="Test Label"
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders image correctly", () => {
  const getImageDetails = jest.fn(() => sampleOne(generateImageDetails));
  const reference = { sys: { id: "a" } };
  const layoutDimensions = { width: 500, height: 200 };
  const output = shallow(
    <ImageBackground
      getImageDetails={getImageDetails}
      reference={reference}
      resizeMode="contain"
      accessibilityLabel="Test Label"
    />
  );

  output.instance().onLayout({ nativeEvent: { layout: layoutDimensions } });
  output.update();

  expect(getImageDetails).toHaveBeenCalledTimes(1);
  expect(getImageDetails).toBeCalledWith(reference.sys.id, layoutDimensions);
  expect(output).toMatchSnapshot();
});
