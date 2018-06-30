// @flow
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { shallow } from "enzyme";
import { TouchableWithoutFeedback } from "react-native";
import Permissions from "react-native-permissions";
import Map, { checkLocationPermission, requestLocationPermission } from "./Map";
import {
  generateEvent,
  generateAmenity,
  sampleOne
} from "../../data/__test-data";
import * as position from "../../lib/position";
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

let getCurrentPositionSpy;
let permissionRequestSpy;
let permissionCheckSpy;

beforeEach(() => {
  getCurrentPositionSpy = jest.spyOn(position, "getCurrentPosition");
  permissionRequestSpy = jest.spyOn(Permissions, "request");
  permissionCheckSpy = jest.spyOn(Permissions, "check");
});

afterEach(() => {
  getCurrentPositionSpy.mockRestore();
  permissionRequestSpy.mockRestore();
  permissionCheckSpy.mockRestore();
});

describe("Map component", () => {
  it("renders correctly", () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("authorized"));

    const output = render(regionProps);
    expect(output).toMatchSnapshot();
  });

  it("updates state when stage is clicked", () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("authorized"));

    const output = render(regionProps);
    const markerPressSpy = jest.spyOn(output.instance(), "handleMarkerPress");
    output.find(Marker).forEach(child => {
      child.simulate("press");
    });
    expect(markerPressSpy).toHaveBeenCalled();
    expect(output.state()).toMatchSnapshot();
    jest.clearAllMocks();
  });

  it("clears state when map is clicked", () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("authorized"));

    const output = render(regionProps);
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

  it("renders without location button when permission was denied", async () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("restricted"));

    const output = render(regionProps);
    await Promise.resolve();
    output.update();

    expect(output).toMatchSnapshot();
  });

  it("checks location permission on mount", async () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("authorized"));

    const output = render(regionProps);

    expect(output.state().locationPermission).toEqual("checking");
    expect(permissionCheckSpy).toHaveBeenCalledWith("location");

    await Promise.resolve();

    expect(output.state().locationPermission).toBe("authorized");
  });

  it("renders recurring stage event once", () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("authorized"));

    const recurrenceStage = {
      ...stage,
      id: `${stage.id}-reucrrence-2018-07-07`
    };

    const output = shallow(
      <Map
        {...regionProps}
        stages={[stage, recurrenceStage]}
        amenities={[amenity]}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        onEventCardPress={() => {}}
        savedEvents={new Set()}
      />
    );

    expect(output.find("MapMarker").length).toBe(3);
  });
});

describe("onRegionChange", () => {
  it("sets atUserLocation to false when user navigates away", () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("authorized"));

    const output = render(regionProps);
    output.setState({ atUserLocation: true });

    output
      .find(MapView)
      .simulate("regionChange", { latitude: 0, longitude: 0 });

    expect(output.state().atUserLocation).toBe(false);
  });

  it("checks geolocation and updates atUserLocation accordingly", async () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("authorized"));
    getCurrentPositionSpy.mockReturnValue(
      Promise.resolve({ coords: { latitude: 0, longitude: 0 } })
    );
    const output = render(regionProps);
    output.setState({ atUserLocation: false });

    await Promise.resolve();

    output
      .find(MapView)
      .simulate("regionChange", { latitude: 0, longitude: 0 });
    expect(getCurrentPositionSpy).toHaveBeenCalled();

    output.setState({ atUserLocation: true });
  });

  it("checks geolocation and updates atUserLocation accordingly", async () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("denied"));
    getCurrentPositionSpy.mockReturnValue(
      Promise.resolve({ coords: { latitude: 0, longitude: 0 } })
    );

    const output = render(regionProps);
    output.setState({ atUserLocation: false });

    await Promise.resolve();

    output
      .find(MapView)
      .simulate("regionChange", { latitude: 0, longitude: 0 });
    expect(getCurrentPositionSpy).not.toHaveBeenCalled();
  });
});

describe("moveToCurrentLocation", () => {
  it("moves to user location when authorized", async () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("authorized"));
    permissionRequestSpy.mockReturnValue(Promise.resolve("authorized"));
    getCurrentPositionSpy.mockReturnValue(
      Promise.resolve({ latitude: 0, longitude: 0 })
    );

    const output = render(regionProps);
    const animateToCoordinate = jest.fn();

    output.instance().mapViewRef.current = { animateToCoordinate };

    const handler = output.find(TouchableWithoutFeedback).prop("onPress");
    await handler();

    expect(animateToCoordinate).toHaveBeenCalledWith(
      { latitude: 0, longitude: 0 },
      500
    );
  });

  it("requests permission when undetermined", async () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("undetermined"));
    permissionRequestSpy.mockReturnValue(Promise.resolve("authorized"));
    getCurrentPositionSpy.mockReturnValue(
      Promise.resolve({ coords: { latitude: 0, longitude: 0 } })
    );

    const output = render(regionProps);

    output.find(TouchableWithoutFeedback).simulate("press");
    await new Promise(resolve => setTimeout(resolve));
    expect(Permissions.request).toHaveBeenCalledWith("location");
    expect(getCurrentPositionSpy).toHaveBeenCalled();
  });

  it("does not request permission when restricted", async () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("restricted"));
    getCurrentPositionSpy.mockReturnValue(
      Promise.resolve({ coords: { latitude: 0, longitude: 0 } })
    );

    const output = render(regionProps);

    await new Promise(resolve => setTimeout(resolve));
    output.find(TouchableWithoutFeedback).simulate("press");

    expect(Permissions.request).not.toHaveBeenCalled();
    expect(getCurrentPositionSpy).not.toHaveBeenCalled();
  });
});

describe("checkLocationPermission", () => {
  it("will set initial state to checking", () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("authorized"));
    const mockSetState = jest.fn();
    checkLocationPermission(mockSetState);

    expect(mockSetState).toHaveBeenCalledWith({
      locationPermission: "checking"
    });
  });

  it("will update state to resolved value of permission check", () => {
    permissionCheckSpy.mockReturnValue(Promise.resolve("authorized"));

    const mockSetState = jest.fn();
    return checkLocationPermission(mockSetState).then(() => {
      expect(mockSetState.mock.calls[1][0]).toEqual({
        locationPermission: "authorized"
      });
    });
  });
});

describe("requestLocationPermission", () => {
  const state = {
    locationPermission: "undetermined",
    atUserLocation: false,
    activeMarker: null,
    tileDetails: null
  };
  it("will set initial state to asking", () => {
    permissionRequestSpy.mockReturnValue(Promise.resolve("authorized"));
    const mockSetState = jest.fn();
    requestLocationPermission(mockSetState, state);

    expect(mockSetState).toHaveBeenCalledWith({
      locationPermission: "asking"
    });
  });

  it("will update state to resolved value of permission check", () => {
    permissionRequestSpy.mockReturnValue(Promise.resolve("authorized"));
    const mockSetState = jest.fn();
    return requestLocationPermission(mockSetState, state).then(() => {
      expect(mockSetState.mock.calls[1][0]).toEqual({
        locationPermission: "authorized"
      });
    });
  });

  it("will return if location permission is restricted", () => {
    const mockSetState = jest.fn();
    expect(mockSetState).not.toHaveBeenCalled();
  });
});
