// @flow
import { shallow } from "enzyme";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import MapView from "react-native-maps";
import Permissions from "react-native-permissions";
import Map from "./Map";
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

global.navigator = {
  geolocation: {
    getCurrentPosition: jest.fn()
  }
};

afterEach(() => {
  // $FlowFixMe
  Permissions.check.mockClear();
  // $FlowFixMe
  Permissions.request.mockClear();
  navigator.geolocation.getCurrentPosition.mockClear();
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

    expect(output.state().locationPermission).toBeUndefined();
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

      const output = render(regionProps);
      output.setState({ atUserLocation: false });

      await Promise.resolve();

      output
        .find(MapView)
        .simulate("regionChange", { latitude: 0, longitude: 0 });
      expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();

      const callback =
        navigator.geolocation.getCurrentPosition.mock.calls[0][0];
      callback({
        coords: { latitude: 0, longitude: 0 }
      });

      output.setState({ atUserLocation: true });
    });

    it("checks geolocation and updates atUserLocation accordingly", async () => {
      // $FlowFixMe
      Permissions.check.mockReturnValue(Promise.resolve("denied"));

      const output = render(regionProps);
      output.setState({ atUserLocation: false });

      await Promise.resolve();

      output
        .find(MapView)
        .simulate("regionChange", { latitude: 0, longitude: 0 });
      expect(navigator.geolocation.getCurrentPosition).not.toHaveBeenCalled();
    });
  });

  describe("moveToCurrentLocation", () => {
    it("moves to user location when authorized", async () => {
      // $FlowFixMe
      Permissions.check.mockReturnValue(Promise.resolve("authorized"));

      const output = render(regionProps);
      const animateToCoordinate = jest.fn();
      output.instance().mapViewRef.current = { animateToCoordinate };

      output.find(TouchableWithoutFeedback).simulate("press");
      await new Promise(resolve => setTimeout(resolve));

      expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();

      const callback =
        navigator.geolocation.getCurrentPosition.mock.calls[0][0];
      callback({
        coords: { latitude: 0, longitude: 0 }
      });

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

      const output = render(regionProps);

      output.find(TouchableWithoutFeedback).simulate("press");
      await new Promise(resolve => setTimeout(resolve));

      expect(Permissions.request).toHaveBeenCalledWith("location");
      expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });

    it("does not request permission when restricted", async () => {
      // $FlowFixMe
      Permissions.check.mockReturnValue(Promise.resolve("restricted"));

      const output = render(regionProps);

      output.find(TouchableWithoutFeedback).simulate("press");
      await new Promise(resolve => setTimeout(resolve));

      expect(Permissions.request).not.toHaveBeenCalled();
      expect(navigator.geolocation.getCurrentPosition).not.toHaveBeenCalled();
    });
  });
});
