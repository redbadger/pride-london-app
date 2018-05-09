// @flow
import React from "react";
import { shallow } from "enzyme";
import EventCard from "./EventCard";

it("renders correctly when the event is free", () => {
  const output = shallow(
    <EventCard
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      eventPriceLow={0}
      eventPriceHigh={0}
      image={{ uri: "https://image.jpg", width: 10, height: 10 }}
      toggleSaved={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});
it("renders correctly when there is a price range", () => {
  const output = shallow(
    <EventCard
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      eventPriceLow={12}
      eventPriceHigh={14}
      image={{ uri: "https://image.jpg", width: 10, height: 10 }}
      toggleSaved={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});
it("renders correctly when there is only one price", () => {
  const output = shallow(
    <EventCard
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      eventPriceLow={12}
      eventPriceHigh={12}
      image={{ uri: "https://image.jpg", width: 10, height: 10 }}
      toggleSaved={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});
