// @flow
import React from "react";
import { shallow } from "enzyme";
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
      isFree
      eventPriceLow={0}
      eventPriceHigh={0}
      image={{ uri: "https://image.jpg", width: 100, height: 100 }}
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
      isFree
      eventPriceLow={0}
      eventPriceHigh={0}
      image={{ uri: "https://image.jpg", width: 100, height: 100 }}
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
      isFree
      eventPriceLow={0}
      eventPriceHigh={0}
      image={{ uri: "https://image.jpg", width: 100, height: 100 }}
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
      isFree
      eventPriceLow={0}
      eventPriceHigh={0}
      image={{ uri: "https://image.jpg", width: 100, height: 100 }}
      isSaved={false}
      addSavedEvent={() => {}}
      removeSavedEvent={mockRemoveSavedEvent}
      onPress={() => {}}
    />
  );
  output.find(SaveEventButton).simulate("press", false);
  expect(mockRemoveSavedEvent).toBeCalledWith("id");
});

it("renders correctly when isFree is true", () => {
  const output = shallow(
    <EventCard
      id="id"
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      isFree
      eventPriceLow={0}
      eventPriceHigh={0}
      image={{ uri: "https://image.jpg", width: 10, height: 10 }}
      isSaved={false}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly when isFree is false and there is a price range", () => {
  const output = shallow(
    <EventCard
      id="id"
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      isFree={false}
      eventPriceLow={12}
      eventPriceHigh={14}
      image={{ uri: "https://image.jpg", width: 10, height: 10 }}
      isSaved={false}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly when isFree is false and there's only one price", () => {
  const output = shallow(
    <EventCard
      id="id"
      name="name"
      locationName="location"
      startTime="2018-09-16T12:12:12+01:00"
      endTime="2018-09-16T13:12:12+01:00"
      isFree={false}
      eventPriceLow={12}
      eventPriceHigh={12}
      image={{ uri: "https://image.jpg", width: 10, height: 10 }}
      isSaved={false}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});
