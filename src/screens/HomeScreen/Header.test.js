// @flow
import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";
import {
  generateImageDetails,
  generateHeaderBanner,
  sampleArrayOf,
  sampleOne
} from "../../data/__test-data";

const getImageDetails = jest
  .fn()
  .mockReturnValue(sampleOne(generateImageDetails));

it("renders correctly", () => {
  const output = shallow(
    <Header
      headerBanners={sampleArrayOf(generateHeaderBanner)(2)}
      getImageDetails={getImageDetails}
      navigation={null}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders nothing when no banner is available", () => {
  const output = shallow(
    <Header
      headerBanners={[]}
      getImageDetails={getImageDetails}
      navigation={null}
    />
  );
  expect(output).toMatchSnapshot();
});
