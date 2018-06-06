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
        contentType: "sponsor",
        locale: "en-GB",
        id: String(i + 1),
        fields: {
          sponsorName: "some other",
          sponsorLogo: {
            sys: { id: `asset${i + 1}` }
          },
          sponsorUrl: "http://example.com",
          sponsorLevel: "Gold"
        },
        revision: 1
      }: Sponsor)
  );

describe("SponsorLogoContainer Component", () => {
  it("renders correctly with Gold Level", () => {
    const output = shallow(
      <SponsorLogoContainer
        sponsorLevel="Gold"
        sponsors={generateSponsors(2)}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders correctly with Silver Level", () => {
    const output = shallow(
      <SponsorLogoContainer
        sponsorLevel="Silver"
        sponsors={generateSponsors(2)}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("navigates to sponsor link onPress", () => {
    const output = shallow(
      <SponsorLogoContainer
        sponsorLevel="Silver"
        sponsors={generateSponsors(2)}
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
