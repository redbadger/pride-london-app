// @flow
import React from "react";
import { shallow } from "enzyme";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { generateEvent, sampleOne } from "../../data/__test-data";
import { EVENT_DETAILS } from "../../constants/routes";
import ParadeMapScreen from "./component";
import Map from "./Map";

const navigation: NavigationScreenProp<NavigationState> = ({
  navigate: () => {}
}: any);

const stages = sampleOne(generateEvent, { seed: 5728 });

it("renders correctly", () => {
  const output = shallow(
    <ParadeMapScreen
      isFocused
      navigation={navigation}
      stages={[stages]}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
      savedEvents={new Set()}
    />
  );
  expect(output).toMatchSnapshot();
});

it("does not render map when not focused", () => {
  const output = shallow(
    <ParadeMapScreen
      isFocused={false}
      navigation={navigation}
      stages={[stages]}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
      savedEvents={new Set()}
    />
  );
  expect(output).toMatchSnapshot();
});

it("opens an event", () => {
  const navigationSpy = jest.fn();
  const nav: NavigationScreenProp<NavigationState> = ({
    navigate: navigationSpy
  }: any);
  const output = shallow(
    <ParadeMapScreen
      isFocused
      navigation={nav}
      stages={[stages]}
      addSavedEvent={() => {}}
      removeSavedEvent={() => {}}
      onPress={() => {}}
      savedEvents={new Set()}
    />
  );

  output
    .find(Map)
    .props()
    .onPress(1);

  expect(navigationSpy).toBeCalledWith(EVENT_DETAILS, { eventId: 1 });
  jest.clearAllMocks();
});
