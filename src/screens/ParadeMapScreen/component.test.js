// @flow
import React from "react";
import { shallow } from "enzyme";
import Permissions from "react-native-permissions";
import ParadeMapScreen from "./component";
import {
  region as paradeRegion,
  route,
  terminals
} from "../../constants/parade-coordinates";

// const navigation: NavigationScreenProp<*> = ({}: any);
const requestMock = jest.fn();

const render = (props, request) =>
  shallow(
    <ParadeMapScreen
      navigation={{ addListener: jest.fn() }}
      {...props}
      requestPermission={requestMock}
    />
  );

jest.mock("react-native-permissions", () => ({
  check: jest.fn(),
  request: jest.fn()
}));

describe("Parade Map Screen component", () => {
  it("renders correctly", () => {
    const spy = jest
      .spyOn(Permissions, "check")
      .mockResolvedValue("authorized");

    const props = {
      route,
      paradeRegion,
      terminals
    };
    const output = render(props);
    expect(output).toMatchSnapshot();

    spy.mockClear();
  });

  it("checks for location permission", () => {
    const checkSpy = jest
      .spyOn(Permissions, "check")
      .mockResolvedValue("authorized");

    render();
    expect(checkSpy).toHaveBeenCalled();
    checkSpy.mockClear();
  });

  it("requests permission if not currently authorised", () => {
    const checkSpy = jest
      .spyOn(Permissions, "check")
      .mockResolvedValue("undetermined");
    const requestSpy = jest
      .spyOn(Permissions, "request")
      .mockResolvedValue("authorized");
    render();
    expect(requestSpy).toHaveBeenCalled();
    checkSpy.mockClear();
    requestSpy.mockClear();
  });
});

describe("checkPermission", () => {
  it("calls requestPermission if permission is not authorized", () => {
    const checkSpy = jest
      .spyOn(Permissions, "check")
      .mockResolvedValue("undetermined");

    const output = render();
    output.instance().checkPermission();

    expect(requestMock).toHaveBeenCalled();
    checkSpy.mockClear();
    requestMock.mockClear();
  });
});
