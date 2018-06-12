// @flow
import React from "react";
import { shallow } from "enzyme";
import EventDescription from "./EventDescription";
import { generateEvent, sampleOne } from "../../data/__test-data";
import type { Event } from "../../data/event";

it("renders correctly", () => {
  const event: Event = sampleOne(generateEvent);

  const output = shallow(<EventDescription event={event} />);
  expect(output).toMatchSnapshot();
});
