// @flow
import React from "react";
import { shallow } from "enzyme";
import StageMarkers from "./StageMarkers";
import { generateEvent, sampleOne } from "../../data/__test-data";

const stage = sampleOne(generateEvent, { seed: 5728 });

describe("AmenityMarkers component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <StageMarkers
        stages={[stage]}
        handleMarkerPress={() => {}}
        activeMarker={null}
        markerSelect={() => {}}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders nothing when no amenities provided", () => {
    const output = shallow(
      <StageMarkers
        stages={[]}
        handleMarkerPress={() => {}}
        activeMarker={null}
        markerSelect={() => {}}
      />
    );
    expect(output.children().length).toBe(0);
  });

  it("renders recurring stage event once", () => {
    const recurrenceStage = {
      ...stage,
      id: `${stage.id}-recurrence-2018-07-07`
    };

    const output = shallow(
      <StageMarkers
        stages={[stage, recurrenceStage]}
        handleMarkerPress={() => {}}
        activeMarker={null}
        markerSelect={() => {}}
      />
    );

    expect(output.find("MapMarker").length).toBe(1);
  });

  it("calls callback function when pressed", () => {
    const mockHandleMarkerPress = jest.fn();
    const output = shallow(
      <StageMarkers
        stages={[stage]}
        handleMarkerPress={mockHandleMarkerPress}
        activeMarker={null}
        markerSelect={() => {}}
      />
    );

    output.find("MapMarker").simulate("press");

    expect(mockHandleMarkerPress).toHaveBeenCalled();
  });
});
