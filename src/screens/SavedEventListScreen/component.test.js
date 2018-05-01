// @flow
import React from "react";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { shallow } from "enzyme";
import Component from "./component";
import EventList from "../../components/EventList";
import Loading from "../../components/Loading";
import NoSavedEvents from "./NoSavedEvents";

const navigation: NavigationScreenProp<NavigationState> = ({
  navigate: () => {}
}: any);

describe("EventsScreen Component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[{ name: "super duper event" }]}
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
        events={[{ name: "super duper event" }]}
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

    const loadingText = output.find(Loading);

    expect(loadingText.length).toEqual(1);
  });

  it("renders no saved events screen when there are no events", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[]}
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
    expect(output.find(NoSavedEvents).length).toEqual(1);
  });

  it("updates events on refresh", () => {
    const updateEvents = jest.fn();
    const output = shallow(
      <Component
        navigation={navigation}
        events={[{ name: "super duper event" }]}
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
