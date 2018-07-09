// @flow
import React from "react";
import { shallow } from "enzyme";
import { Marker } from "react-native-maps";
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
        activeMarker={undefined}
      />
    );
    expect(output.children().length).toBe(0);
  });

  it("calls onMarkerPress function when pressed", () => {
    const mockHandleMarkerPress = jest.fn();
    const output = shallow(
      <AmenityMarkers
        amenities={amenities}
        activeMarker={null}
        onMarkerPress={mockHandleMarkerPress}
        onMarkerSelect={() => {}}
      />
    );

    output
      .find(Marker)
      .first()
      .simulate("press");

    expect(mockHandleMarkerPress).toHaveBeenCalled();
  });
});
