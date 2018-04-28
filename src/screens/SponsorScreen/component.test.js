// @flow
import React from "react";
import { shallow } from "enzyme";
import Component from "./component";
import type { Sponsor } from "../../data/sponsor";

const generateSponsors = (count = 2): Sponsor[] =>
  Array.from(Array(count)).map(
    (_, i) =>
      ({
        sys: {
          id: String(i + 1)
        },
        fields: {
          sponsorName: {
            "en-GB": "some other"
          },
          sponsorLogo: {
            "en-GB": {
              sys: {
                id: `asset${i + 1}`
              }
            }
          },
          sponsorUrl: {
            "en-GB": "http://example.com"
          },
          sponsorLevel: {
            "en-GB": "Gold"
          }
        }
      }: any)
  );

const getAssetUrl = jest.fn().mockReturnValue("http://example.com/image.png");
const getAssetSize = jest.fn();
const navigation: any = {
  goBack: jest.fn()
};

describe("SponsorScreen Component", () => {
  const render = props =>
    shallow(
      <Component
        navigation={navigation}
        sponsors={generateSponsors(2)}
        getAssetUrl={getAssetUrl}
        getAssetSize={getAssetSize}
        {...props}
      />
    );

  it("renders correctly", () => {
    const output = render();
    expect(output).toMatchSnapshot();
  });

  it("navigates back when user presses back button in toolbar", () => {
    const output = render();
    const backBtn = output.find({ testID: "back" });
    backBtn.simulate("press");
    expect(navigation.goBack).toHaveBeenCalledWith(null);
  });
});

afterEach(() => {
  getAssetUrl.mockClear();
  navigation.goBack.mockClear();
});
