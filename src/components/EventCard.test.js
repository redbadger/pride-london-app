// @flow
import React from "react";
import { shallow } from "enzyme";
import { generateFieldRef, sampleOne } from "../data/__test-data";
import EventCard from "./EventCard";
import SaveEventButton from "./SaveEventButton";
import Touchable from "./Touchable";

it("renders correctly", () => {
  const output = shallow(
    <EventCard
      id="id"
      name="name"
      locationName="location"
      startTime="2018-09-11T12:12:12+01:00"
      endTime="2018-09-12T13:12:12+01:00"
      eventPriceLow={0}
      eventPriceHigh={0}
      imageReference={sampleOne(generateFieldRef)}
      isSaved={false}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});

it("calls onPress with id when pressed", () => {
  const mockOnPress = jest.fn();
  const output = shallow(
    <EventCard
      id="id"
      name="name"
      locationName="location"
      startTime="2018-09-11T12:12:12+01:00"
      endTime="2018-09-12T13:12:12+01:00"
      eventPriceLow={0}
      eventPriceHigh={0}
      imageReference={sampleOne(generateFieldRef)}
      isSaved={false}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={mockOnPress}
    />
  );
  output.find(Touchable).simulate("press");
  expect(mockOnPress).toBeCalledWith("id");
});

it("calls addSavedEvent when SaveEventButton.onPress is called with true", () => {
  const mockAddSavedEvent = jest.fn();
  const output = shallow(
    <EventCard
      id="id"
      name="name"
      locationName="location"
      startTime="2018-09-11T12:12:12+01:00"
      endTime="2018-09-12T13:12:12+01:00"
      eventPriceLow={0}
      eventPriceHigh={0}
      imageReference={sampleOne(generateFieldRef)}
      isSaved={false}
      addSavedEvent={mockAddSavedEvent}
      removeSavedEvent={() => {}}
      onPress={() => {}}
    />
  );
  output.find(SaveEventButton).simulate("press", true);
  expect(mockAddSavedEvent).toBeCalledWith("id");
});

it("calls removeSavedEvent when SaveEventButton.onPress is called with false", () => {
  const mockRemoveSavedEvent = jest.fn();
  const output = shallow(
    <EventCard
      id="id"
      name="name"
      locationName="location"
      startTime="2018-09-11T12:12:12+01:00"
      endTime="2018-09-12T13:12:12+01:00"
      eventPriceLow={0}
      eventPriceHigh={0}
      imageReference={sampleOne(generateFieldRef)}
      isSaved={false}
      addSavedEvent={() => {}}
      removeSavedEvent={mockRemoveSavedEvent}
      onPress={() => {}}
    />
  );
  output.find(SaveEventButton).simulate("press", false);
  expect(mockRemoveSavedEvent).toBeCalledWith("id");
});

it("renders correctly when the event is free", () => {
  const output = shallow(
    <EventCard
      id="id"
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      eventPriceLow={0}
      eventPriceHigh={0}
      imageReference={sampleOne(generateFieldRef)}
      isSaved={false}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly when there is a price range", () => {
  const output = shallow(
    <EventCard
      id="id"
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      eventPriceLow={12}
      eventPriceHigh={14}
      imageReference={sampleOne(generateFieldRef)}
      isSaved={false}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly when there is only one price", () => {
  const output = shallow(
    <EventCard
      id="id"
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      eventPriceLow={12}
      eventPriceHigh={12}
      imageReference={sampleOne(generateFieldRef)}
      isSaved={false}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});
