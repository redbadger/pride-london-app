// @flow
import React from "react";
import { shallow } from "enzyme";
import { generateEvent, sampleOne } from "../../data/__test-data";
import EventOverview from "./EventOverview";
import type { Event } from "../../data/event";

const defaultEvent: Event = sampleOne(generateEvent, { seed: 9827 });

it("renders correctly", () => {
  const output = shallow(<EventOverview event={defaultEvent} />);
  expect(output).toMatchSnapshot();
});

it("renders recurrence dates when provided", () => {
  const event: Event = {
    ...defaultEvent,
    fields: {
      ...defaultEvent.fields,
      recurrenceDates: ["08/08/2018", "09/08/2018", "10/09/2018"]
    }
  };
  const output = shallow(<EventOverview event={event} />);
  const recurrenceDates = output.find("RecurrenceDates");

  expect(recurrenceDates.length).toBe(1);
});

it("does not render recurring dates when none provided", () => {
  const event: Event = {
    ...defaultEvent,
    fields: {
      ...defaultEvent.fields,
      recurrenceDates: []
    }
  };
  const output = shallow(<EventOverview event={event} />);
  const recurrenceDates = output.find("RecurrenceDates");

  expect(recurrenceDates.length).toBe(0);
});
