// @flow
import React from "react";
import { shallow } from "enzyme";
import StageMarkers from "./StageMarkers";
import { generateEvent, sampleOne } from "../../data/__test-data";
import type { Event } from "../../data/event";

const stage = sampleOne(generateEvent, { seed: 5728 });

describe("AmenityMarkers component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <StageMarkers
        stages={[stage]}
        // eslint-disable-next-line no-unused-vars
        handleMarkerPress={(_: Event) => {}}
        activeMarker={null}
        markerSelect={() => {}}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders correctly when it's the currently selected stage", () => {
    const output = shallow(
      <StageMarkers
        stages={[stage]}
        // eslint-disable-next-line no-unused-vars
        handleMarkerPress={(_: Event) => {}}
        activeMarker={stage.id}
        markerSelect={() => {}}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders nothing when no amenities provided", () => {
    const output = shallow(
      <StageMarkers
        stages={[]}
        // eslint-disable-next-line no-unused-vars
        handleMarkerPress={(_: Event) => {}}
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
        // eslint-disable-next-line no-unused-vars
        handleMarkerPress={(_: Event) => {}}
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
