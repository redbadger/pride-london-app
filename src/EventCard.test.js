// @flow
import React from "react";
import { shallow } from "enzyme";
import EventCard from "./EventCard";

it("renders correctly", () => {
  const output = shallow(<EventCard name="some event" />);
  expect(output).toMatchSnapshot();
});
