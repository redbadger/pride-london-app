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
        getAssetById={() => ({}: any)}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders navigation header correctly", () => {
    const params = Component.navigationOptions({ navigation });
    expect(params.title).toEqual("Events");
  });

  it("navigates to event details on event item press", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[]}
        getAssetById={() => ({}: any)}
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
