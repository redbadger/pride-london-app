// @flow
import React from "react";
import { shallow } from "enzyme";
import EventCard from "./EventCard";

it("renders correctly when isFree is true", () => {
  const output = shallow(
    <EventCard
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      isFree
      eventPriceLow={0}
      eventPriceHigh={0}
      imageUrl="https://image.jpg"
      toggleSaved={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});
it("renders correctly when isFree is false and there is a price range", () => {
  const output = shallow(
    <EventCard
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      isFree={false}
      eventPriceLow={12}
      eventPriceHigh={14}
      imageUrl="https://image.jpg"
      toggleSaved={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});
it("renders correctly when isFree is false and there's only one price", () => {
  const output = shallow(
    <EventCard
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      isFree={false}
      eventPriceLow={12}
      eventPriceHigh={12}
      imageUrl="https://image.jpg"
      toggleSaved={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});
