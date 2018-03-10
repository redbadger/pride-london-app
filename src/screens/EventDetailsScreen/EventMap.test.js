// @flow
import React from "react";
import { shallow } from "enzyme";
import EventMap from "./EventMap";

it("renders correctly", () => {
  const output = shallow(
    <EventMap lat={100} lon={200} locationName="somewhere" />
  );
  expect(output).toMatchSnapshot();
});
