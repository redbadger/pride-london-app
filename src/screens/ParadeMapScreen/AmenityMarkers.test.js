// @flow
import React from "react";
import { shallow } from "enzyme";
import AmenityMarkers from "./AmenityMarkers";
import { generateAmenity, sampleOne } from "../../data/__test-data";

const amenities = [
  sampleOne(generateAmenity, { seed: 5728 }),
  sampleOne(generateAmenity, { seed: 1234 }),
  sampleOne(generateAmenity, { seed: 4535 })
];

describe("AmenityMarkers component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <AmenityMarkers
        amenities={amenities}
        markerSelect={() => {}}
        handleMarkerPress={() => {}}
        activeMarker={undefined}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders active amenity correctly", () => {
    const output = shallow(
      <AmenityMarkers
        amenities={amenities}
        markerSelect={() => {}}
        handleMarkerPress={() => {}}
        activeMarker={amenities[0].id}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders nothing when no amenities provided", () => {
    const output = shallow(
      <AmenityMarkers
        amenities={[]}
        markerSelect={() => {}}
        handleMarkerPress={() => {}}
        activeMarker={undefined}
      />
    );
    expect(output.children().length).toBe(0);
  });
});
