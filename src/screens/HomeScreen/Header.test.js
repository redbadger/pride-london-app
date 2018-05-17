// @flow
import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";
import { generateHeaderBanners } from "./__test-data";

const getAssetSource = jest.fn().mockReturnValue({
  uri: "https://example.com/images/header-1.png",
  width: 810,
  height: 650
});

it("renders correctly", () => {
  const output = shallow(
    <Header
      headerBanners={generateHeaderBanners(2)}
      getAssetSource={getAssetSource}
      navigation={null}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders nothing when no banner is available", () => {
  const output = shallow(
    <Header
      headerBanners={[]}
      getAssetSource={getAssetSource}
      navigation={null}
    />
  );
  expect(output).toMatchSnapshot();
});
