// @flow
import React from "react";
import { shallow } from "enzyme";
import { Marker } from "react-native-maps";
import type { Event } from "../../data/event";
import StageMarkers from "./StageMarkers";
import { generateEvent, sampleOne } from "../../data/__test-data";

const stage = sampleOne(generateEvent, { seed: 5728 });

describe("AmenityMarkers component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <StageMarkers
        stages={[stage]}
        // eslint-disable-next-line no-unused-vars
        onMarkerPress={(_: Event) => {}}
        activeMarker={null}
        onMarkerSelect={() => {}}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders correctly when it's the currently selected stage", () => {
    const output = shallow(
      <StageMarkers
        stages={[stage]}
        // eslint-disable-next-line no-unused-vars
        onMarkerPress={(_: Event) => {}}
        activeMarker={stage.id}
        onMarkerSelect={() => {}}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders nothing when no amenities provided", () => {
    const output = shallow(
      <StageMarkers
        stages={[]}
        // eslint-disable-next-line no-unused-vars
        onMarkerPress={(_: Event) => {}}
        activeMarker={null}
        onMarkerSelect={() => {}}
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
        onMarkerPress={(_: Event) => {}}
        activeMarker={null}
        onMarkerSelect={() => {}}
      />
    );

    expect(output.find("MapMarker").length).toBe(1);
  });

  it("calls onMarkerPress function when pressed", () => {
    const mockHandleMarkerPress = jest.fn();
    const output = shallow(
      <StageMarkers
        stages={[stage]}
        activeMarker={null}
        onMarkerPress={mockHandleMarkerPress}
        onMarkerSelect={() => {}}
      />
    );

    output.find(Marker).simulate("press");

    expect(mockHandleMarkerPress).toHaveBeenCalled();
  });
});
