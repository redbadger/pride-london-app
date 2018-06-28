// @flow
import { shallow } from "enzyme";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import MapView from "react-native-maps";
import Permissions from "react-native-permissions";
import Map, { checkLocationPermission, requestLocationPermission } from "./Map";
import * as position from "../../lib/position";
import {
  region as paradeRegion,
  route,
  terminals
} from "../../constants/parade-coordinates";

const render = props => shallow(<Map {...props} />);

const regionProps = {
  paradeRegion,
  route,
  terminals,
  permission: true
};

jest.mock("react-native-permissions", () => ({
  check: jest.fn(),
  request: jest.fn()
}));

let getCurrentPositionSpy;

beforeEach(() => {
  getCurrentPositionSpy = jest.spyOn(position, "getCurrentPosition");
});

afterEach(() => {
  // $FlowFixMe
  Permissions.check.mockClear();
  // $FlowFixMe
  Permissions.request.mockClear();
  // navigator.geolocation.getCurrentPosition.mockClear();
  getCurrentPositionSpy.mockRestore();
});

describe("Map component", () => {
  it("renders correctly", () => {
    // $FlowFixMe
    Permissions.check.mockReturnValue(Promise.resolve("authorized"));

    const output = render(regionProps);
    expect(output).toMatchSnapshot();
  });

  it("renders without location button when permission was denied", async () => {
    // $FlowFixMe
    Permissions.check.mockReturnValue(Promise.resolve("restricted"));

    const output = render(regionProps);
    await Promise.resolve();
    output.update();

    expect(output).toMatchSnapshot();
  });

  it("checks location permission on mount", async () => {
    // $FlowFixMe
    Permissions.check.mockReturnValue(Promise.resolve("authorized"));

    const output = render(regionProps);

    expect(output.state().locationPermission).toEqual("checking");
    expect(Permissions.check).toHaveBeenCalledWith("location");

    await Promise.resolve();

    expect(output.state().locationPermission).toBe("authorized");
  });

  describe("onRegionChange", () => {
    it("sets atUserLocation to false when user navigates away", () => {
      // $FlowFixMe
      Permissions.check.mockReturnValue(Promise.resolve("authorized"));

      const output = render(regionProps);
      output.setState({ atUserLocation: true });

      output
        .find(MapView)
        .simulate("regionChange", { latitude: 0, longitude: 0 });

      expect(output.state().atUserLocation).toBe(false);
    });

    it("checks geolocation and updates atUserLocation accordingly", async () => {
      // $FlowFixMe
      Permissions.check.mockReturnValue(Promise.resolve("authorized"));
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
      // $FlowFixMe
      Permissions.check.mockReturnValue(Promise.resolve("denied"));
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
      // $FlowFixMe
      Permissions.check.mockReturnValue(Promise.resolve("authorized"));
      // $FlowFixMe
      Permissions.request.mockReturnValue(Promise.resolve("authorized"));
      getCurrentPositionSpy.mockReturnValue(
        Promise.resolve({ coords: { latitude: 0, longitude: 0 } })
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
      // $FlowFixMe
      Permissions.check.mockReturnValue(Promise.resolve("undetermined"));
      // $FlowFixMe
      Permissions.request.mockReturnValue(Promise.resolve("authorized"));
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
      // $FlowFixMe
      Permissions.check.mockResolvedValue("restricted");
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
      // $FlowFixMe
      Permissions.check.mockReturnValue(Promise.resolve("authorized"));
      const mockSetState = jest.fn();
      checkLocationPermission(mockSetState);

      expect(mockSetState).toHaveBeenCalledWith({
        locationPermission: "checking"
      });
    });

    it("will update state to resolved value of permission check", () => {
      // $FlowFixMe
      Permissions.check.mockReturnValue(Promise.resolve("authorized"));

      const mockSetState = jest.fn();
      return checkLocationPermission(mockSetState).then(() => {
        expect(mockSetState.mock.calls[1][0]).toEqual({
          locationPermission: "authorized"
        });
      });
    });
  });

  describe("requestLocationPermission", () => {
    const state = { locationPermission: "undetermined" };
    it("will set initial state to asking", () => {
      // $FlowFixMe
      Permissions.request.mockReturnValue(Promise.resolve("authorized"));
      const mockSetState = jest.fn();
      requestLocationPermission(mockSetState, state);

      expect(mockSetState).toHaveBeenCalledWith({
        locationPermission: "asking"
      });
    });

    it("will update state to resolved value of permission check", () => {
      // $FlowFixMe
      Permissions.request.mockReturnValue(Promise.resolve("authorized"));
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
});
