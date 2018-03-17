// @flow
import React from "react";
import { shallow } from "enzyme";
import EventCard from "./EventCard";

it("renders correctly", () => {
  const output = shallow(
    <EventCard
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      isFree
      eventPriceLow={12}
      eventPriceHigh={14}
    />
  );
  expect(output).toMatchSnapshot();
});
