// @flow
import React from "react";
import { shallow } from "enzyme";
import EventCard from "./EventCard";

it("renders correctly", () => {
  const output = shallow(
    <EventCard
      name="name"
      locationName="location"
      price={16}
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      imageUrl="https://image.jpg"
    />
  );
  expect(output).toMatchSnapshot();
});
