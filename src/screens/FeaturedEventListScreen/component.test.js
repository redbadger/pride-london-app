// @flow
import React from "react";
import type { NavigationScreenProp } from "react-navigation";
import { shallow } from "enzyme";
import Component from "./component";
import EventList from "../../components/EventList";
import { EVENT_DETAILS } from "../../constants/routes";

const navigation: NavigationScreenProp<{
  params: { title: string }
}> = ({
  navigate: jest.fn(),
  state: {
    params: {
      title: "Events"
    }
  }
}: any);

describe("FeaturedEventListScreen Component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[]}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("navigates to event details on event item press", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[]}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
      />
    );
    const onPress = output.find(EventList).prop("onPress");
    onPress("my-event");
    expect(navigation.navigate).toHaveBeenCalledWith(EVENT_DETAILS, {
      eventId: "my-event"
    });
  });
});

afterEach(() => {
  navigation.navigate.mockClear();
});
