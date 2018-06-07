// @flow
import React from "react";
import { shallow } from "enzyme";
import { sampleOne, generateFieldRef } from "../../data/__test-data";
import SponsorLogo from "./SponsorLogo";

describe("SponsorLogo Component", () => {
  it("renders correctly with Gold Level", () => {
    const output = shallow(
      <SponsorLogo
        sponsorName="sponsorName"
        sponsorLogo={sampleOne(generateFieldRef)}
        sponsorLevel="Gold"
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders correctly with Silver Level", () => {
    const output = shallow(
      <SponsorLogo
        sponsorName="sponsorName"
        sponsorLogo={sampleOne(generateFieldRef)}
        sponsorLevel="Silver"
      />
    );
    expect(output).toMatchSnapshot();
  });
});
