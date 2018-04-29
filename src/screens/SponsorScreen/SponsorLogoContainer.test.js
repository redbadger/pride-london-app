// @flow
import React from "react";
import { Linking } from "react-native";
import { shallow } from "enzyme";
import SponsorLogoContainer from "./SponsorLogoContainer";
import type { Sponsor } from "../../data/sponsor";

let openURLSpy;
beforeEach(() => {
  openURLSpy = jest
    .spyOn(Linking, "openURL")
    .mockImplementation(() => Promise.resolve());
});

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

describe("SponsorLogoContainer Component", () => {
  it("renders correctly with Gold Level", () => {
    const output = shallow(
      <SponsorLogoContainer
        sponsorLevel="Gold"
        sponsors={generateSponsors(2)}
        getAssetUrl={getAssetUrl}
        getAssetSize={getAssetSize}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders correctly with Silver Level", () => {
    const output = shallow(
      <SponsorLogoContainer
        sponsorLevel="Silver"
        sponsors={generateSponsors(2)}
        getAssetUrl={getAssetUrl}
        getAssetSize={getAssetSize}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("navigates to sponsor link onPress", () => {
    const output = shallow(
      <SponsorLogoContainer
        sponsorLevel="Silver"
        sponsors={generateSponsors(2)}
        getAssetUrl={getAssetUrl}
        getAssetSize={getAssetSize}
      />
    );
    const sponsorLink = output.find({ testID: "sponsor-tile-1" });
    sponsorLink.simulate("press");

    expect(openURLSpy).toHaveBeenCalledWith("http://example.com");
  });
});

afterEach(() => {
  openURLSpy.mockRestore();
});
