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

const render = props =>
  shallow(
    <ParadeMapScreen navigation={{ addListener: jest.fn() }} {...props} />
  );

jest.mock("react-native-permissions", () => ({
  check: jest.fn(),
  request: jest.fn()
}));

describe("Parade Map Screen component", () => {
  it("renders correctly", () => {
    // $FlowFixMe:
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
    // $FlowFixMe:
    const checkSpy = jest
      .spyOn(Permissions, "check")
      .mockResolvedValue("authorized");

    render();
    expect(checkSpy).toHaveBeenCalled();
    checkSpy.mockClear();
  });
});

// describe("checkPermission", () => {
//   it("calls requestPermission if permission is not authorized", () => {
//     const checkSpy = jest
//     .spyOn(Permissions, "check")

//     const output = render();
//     const mockRequest = output.instance().requestPermission = jest.fn()
//     output.update()
//     output.instance().checkPermission()
//     checkSpy.mockResolvedValue('authorized').then(
//       expect(mockRequest).toHaveBeenCalled()
//     );
//     expect(mockRequest).toHaveBeenCalled()
//     jest.restoreAllMocks()
//   });
// });
