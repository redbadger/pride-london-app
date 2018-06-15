// @flow
import { shallow } from "enzyme";
import React from "react";
import Map from "./Map.ios";
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

describe("Map component", () => {
  it("renders correctly", () => {
    const output = render(regionProps);
    expect(output).toMatchSnapshot();
  });

  it("does not render a location button if permission is false", () => {
    const output = render({ ...regionProps, permission: false });
    expect(output).toMatchSnapshot();
  });
});
