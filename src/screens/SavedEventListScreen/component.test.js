// @flow
import React from "react";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { shallow } from "enzyme";
import Component from "./component";
import FilterHeader from "../../components/ConnectedFilterHeader";
import EventList from "../../components/EventList";
import {
  EVENT_CATEGORIES_FILTER,
  FILTER_MODAL,
  EVENT_DETAILS
} from "../../constants/routes";

const navigation: NavigationScreenProp<NavigationState> = ({
  navigate: () => {}
}: any);

describe("EventsScreen Component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[]}
        loading={false}
        refreshing={false}
        updateEvents={() => Promise.resolve()}
        getAssetUrl={() => ""}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders loading indicator when loading", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[]}
        loading
        refreshing={false}
        updateEvents={() => Promise.resolve()}
        getAssetUrl={() => ""}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
      />
    );

    const loadingText = output.find("Text").last();

    expect(loadingText.children().text()).toEqual("Loading...");
  });

  it("updates events on refresh", () => {
    const updateEvents = jest.fn();
    const output = shallow(
      <Component
        navigation={navigation}
        events={[]}
        loading={false}
        refreshing={false}
        updateEvents={updateEvents}
        getAssetUrl={() => ""}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
      />
    );

    output
      .find(EventList)
      .props()
      .onRefresh();

    expect(updateEvents).toHaveBeenCalled();
  });
});
