// @flow
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { shallow } from "enzyme";
import { generateEvent, sampleOne } from "../../data/__test-data";
import Map from "./Map";

const stages = sampleOne(generateEvent, { seed: 5728 });

it("renders correctly", () => {
  const output = shallow(
    <Map
      stages={[stages]}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
      savedEvents={new Set()}
    />
  );
  expect(output).toMatchSnapshot();
});

it("updates state when stage is clicked", () => {
  const output = shallow(
    <Map
      stages={[stages]}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
      savedEvents={new Set()}
    />
  );
  const markerPressSpy = jest.spyOn(output.instance(), "handleMarkerPress");
  output.find(Marker).forEach(child => {
    child.simulate("press");
  });
  expect(markerPressSpy).toHaveBeenCalled();
  expect(output.state()).toMatchSnapshot();
  jest.clearAllMocks();
});

it("clears state when map is clicked", () => {
  const output = shallow(
    <Map
      stages={[stages]}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
      savedEvents={new Set()}
    />
  );
  output.setState({
    activeMarker: "QF4dTqmpn9z5ItEizAZ",
    tileDetails: {
      id: "QF4dTqmpn9z5ItEizAZ",
      fields: {
        name: "name",
        locationName: "locationName",
        eventPriceHigh: 10,
        eventPriceLow: 0,
        startTime: "2018-07-07T00:00+00:00",
        endTime: "2018-07-07T03:00+00:00"
      }
    }
  });
  output.find(MapView).simulate("press");
  expect(output.state()).toMatchSnapshot();
});
