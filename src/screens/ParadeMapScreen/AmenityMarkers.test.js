// @flow
import React from "react";
import { shallow } from "enzyme";
import AmenityMarkers from "./AmenityMarkers";
import { generateAmenity, sampleOne } from "../../data/__test-data";

const amenity = sampleOne(generateAmenity, { seed: 5728 });

describe("AmenityMarkers component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <AmenityMarkers amenities={[amenity]} markerSelect={() => {}} />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders nothing when no amenities provided", () => {
    const output = shallow(
      <AmenityMarkers amenities={[]} markerSelect={() => {}} />
    );
    expect(output.children().length).toBe(0);
  });
});
