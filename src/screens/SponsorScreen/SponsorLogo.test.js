// @flow
import React from "react";
import { shallow } from "enzyme";
import SponsorLogo from "./SponsorLogo";

describe("SponsorLogo Component", () => {
  it("renders correctly with Gold Level", () => {
    const output = shallow(
      <SponsorLogo
        sponsorName="sponsorName"
        sponsorLogo={{ uri: "sponsorLogoUrl", width: 100, height: 100 }}
        sponsorLevel="Gold"
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders correctly with Silver Level", () => {
    const output = shallow(
      <SponsorLogo
        sponsorName="sponsorName"
        sponsorLogo={{ uri: "sponsorLogoUrl", width: 100, height: 100 }}
        sponsorLevel="Silver"
      />
    );
    expect(output).toMatchSnapshot();
  });
});
