// @flow
import React from "react";
import MapView from "react-native-maps";
import { shallow } from "enzyme";
import { TouchableWithoutFeedback } from "react-native";
import * as Rx from "rxjs";
import Map from "./Map";
import {
  generateEvent,
  generateAmenity,
  sampleOne
} from "../../data/__test-data";
import * as Geolocation from "../../lib/geolocation";
import {
  region as paradeRegion,
  route,
  terminals
} from "../../constants/parade-coordinates";

const render = props =>
  shallow(
    <Map
      {...props}
      stages={[stage]}
      amenities={[amenity]}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onEventCardPress={() => {}}
      savedEvents={new Set()}
    />
  );

const stage = sampleOne(generateEvent, { seed: 5728 });
const amenity = sampleOne(generateAmenity, { seed: 5728 });

const regionProps = {
  paradeRegion,
  route,
  terminals,
  permission: true
};

let activeLocationStream;
let passiveLocationStream;

beforeEach(() => {
  activeLocationStream = jest
    .spyOn(Geolocation, "activeLocationStream")
    .mockReturnValue(Rx.empty());
  passiveLocationStream = jest
    .spyOn(Geolocation, "passiveLocationStream")
    .mockReturnValue(Rx.empty());
});

afterEach(() => {
  activeLocationStream.mockRestore();
  passiveLocationStream.mockRestore();
});

describe("Map component", () => {
  it("renders correctly", () => {
    const output = render(regionProps);
    expect(output).toMatchSnapshot();
  });

  it("adds subscription to userLocationSubscription on mount", () => {
    const subscription = {
      unsubscribe: jest.fn()
    };
    passiveLocationStream.mockReturnValue({
      subscribe: jest.fn().mockReturnValue(subscription)
    });
    const output = render(regionProps);
    expect(output.instance().userLocationSubscription).toEqual(subscription);
  });

  it("updates userLocation state with value emitted from location subscription", () => {
    const coords = { longitude: 1, latitude: 2 };
    passiveLocationStream.mockReturnValue(
      Rx.of(
        { type: "checking " },
        { type: "authorized", location: { type: "awaiting" } },
        { type: "authorized", location: { type: "tracking", coords } }
      )
    );
    const output = render(regionProps);
    expect(output.state().userLocation).toEqual({
      type: "authorized",
      location: { type: "tracking", coords }
    });
  });

  it("unsubscribes userLocationSubscription on unmount", () => {
    const subscription = {
      unsubscribe: jest.fn()
    };
    passiveLocationStream.mockReturnValue({
      subscribe: jest.fn().mockReturnValue(subscription)
    });
    const output = render(regionProps);
    output.unmount();
    expect(subscription.unsubscribe).toBeCalled();
  });

  it("clears tileDetails and activeMarker state when map is clicked", () => {
    const output = render(regionProps);
    output.setState({
      activeMarker: stage.id,
      tileDetails: stage
    });
    output.find(MapView).simulate("press");
    expect(output.state().tileDetails).toEqual(null);
    expect(output.state().activeMarker).toEqual(null);
  });

  it("renders without location button when permission is restricted", async () => {
    const output = render(regionProps);
    output.setState({
      userLocation: { type: "restricted" }
    });
    expect(output).toMatchSnapshot();
  });
});

describe("onRegionChange", () => {
  it("calls setState with mapLocation", () => {
    const coords = { latitude: 0, longitude: 0 };
    const output = render(regionProps);

    output.find(MapView).simulate("regionChange", coords);

    expect(output.state().mapLocation).toEqual(coords);
  });
});

describe("moveToCurrentLocation", () => {
  it("sets moveToUserLocation state to true", () => {
    const output = render(regionProps);
    output.find(TouchableWithoutFeedback).simulate("press");
    expect(output.state().moveToUserLocation).toEqual(true);
  });

  describe("when userLocation is denied", () => {
    it("updates userLocationSubscription to activeLocationStream", () => {
      const passiveSubscription = {
        unsubscribe: jest.fn()
      };
      const activeSubscription = {
        unsubscribe: jest.fn()
      };
      passiveLocationStream.mockReturnValue({
        subscribe: jest.fn().mockReturnValue(passiveSubscription)
      });
      activeLocationStream.mockReturnValue({
        subscribe: jest.fn().mockReturnValue(activeSubscription)
      });
      const output = render(regionProps);
      output.setState({ userLocation: { type: "denied" } });
      output.find(TouchableWithoutFeedback).simulate("press");
      expect(passiveSubscription.unsubscribe).toBeCalled();
      expect(output.instance().userLocationSubscription).toEqual(
        activeSubscription
      );
    });
  });
});

describe("handleMarkerPress", () => {
  it("updates state with stage marker details", () => {
    const output = render(regionProps);
    const animateToCoordinate = jest.fn();

    output.instance().mapViewRef.current = { animateToCoordinate };
    const handleMarkerPressSpy = output.instance().handleMarkerPress;
    handleMarkerPressSpy(stage);
    expect(output.state().tileDetails).toEqual(stage);
    expect(output.state().activeMarker).toEqual(stage.id);
    jest.clearAllMocks();
  });
});

describe("dismissEventTile", () => {
  it("updates state clearing stage marker details", () => {
    const output = render(regionProps);
    const dismissEventTileSpy = output.instance().dismissEventTile;
    dismissEventTileSpy();
    expect(output.state().tileDetails).toEqual(null);
    expect(output.state().activeMarker).toEqual(null);
  });
});

describe("handleIOSMarkerSelect", () => {
  it("animates to marker coordinates", () => {
    const output = render(regionProps);
    const animateToCoordinate = jest.fn();

    output.instance().mapViewRef.current = { animateToCoordinate };
    const handleIOSMarkerSelectSpy = output.instance().handleIOSMarkerSelect;
    handleIOSMarkerSelectSpy({
      nativeEvent: {
        coordinate: {
          latitude: stage.fields.location.lat,
          longitude: stage.fields.location.lon
        }
      }
    });
    expect(animateToCoordinate.mock.calls[0][0]).toEqual({
      latitude: stage.fields.location.lat,
      longitude: stage.fields.location.lon
    });
    jest.clearAllMocks();
  });
});
