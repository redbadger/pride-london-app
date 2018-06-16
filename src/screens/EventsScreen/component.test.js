// @flow
import React from "react";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { shallow } from "enzyme";
import { generateEvent, sampleOne } from "../../data/__test-data";
import Component from "./component";
import FilterHeader from "./FilterHeaderConnected";
import EventList from "../../components/EventList";
import {
  EVENT_CATEGORIES_FILTER,
  EVENT_ATTRIBUTE_FILTER,
  EVENT_DATE_FILTER,
  EVENT_DETAILS,
  EVENT_LIST
} from "../../constants/routes";

const navigation: NavigationScreenProp<NavigationState> = ({
  navigate: () => {}
}: any);

const event = sampleOne(generateEvent, { seed: 5728 });

describe("EventsScreen Component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[[event]]}
        loading={false}
        refreshing={false}
        updateData={() => Promise.resolve()}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
        route={EVENT_LIST}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders correctly when loading", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[[event]]}
        loading
        refreshing={false}
        updateData={() => Promise.resolve()}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
        route={EVENT_LIST}
      />
    );

    expect(output).toMatchSnapshot();
  });

  it("renders correctly with no events", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[]}
        loading={false}
        refreshing={false}
        updateData={() => Promise.resolve()}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
        route={EVENT_LIST}
      />
    );

    expect(output).toMatchSnapshot();
  });

  it("updates events on refresh", () => {
    const updateData = jest.fn();
    const output = shallow(
      <Component
        navigation={navigation}
        events={[[event]]}
        loading={false}
        refreshing={false}
        updateData={updateData}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
        route={EVENT_LIST}
      />
    );

    output
      .find(EventList)
      .props()
      .onRefresh();

    expect(updateData).toHaveBeenCalled();
  });

  it("scrolls event list to top on scrollEventListToTop", () => {
    const output = shallow(
      <Component
        navigation={navigation}
        events={[[event]]}
        loading={false}
        refreshing={false}
        updateData={() => Promise.resolve()}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
        route={EVENT_LIST}
      />
    );

    const scrollToLocation = jest.fn();
    output.instance().eventListRef.current = {
      sectionList: { scrollToLocation }
    };
    output
      .find(FilterHeader)
      .props()
      .scrollEventListToTop();

    expect(scrollToLocation).toHaveBeenCalledWith({
      itemIndex: 0,
      sectionIndex: 0,
      viewOffset: 40,
      viewPosition: 0,
      animated: false
    });
  });

  describe("navigation", () => {
    const navigationSpy = jest.fn();
    const nav: NavigationScreenProp<NavigationState> = ({
      navigate: navigationSpy
    }: any);

    const output = shallow(
      <Component
        navigation={nav}
        events={[[event]]}
        loading={false}
        refreshing={false}
        updateData={() => Promise.resolve()}
        selectedCategories={new Set()}
        addSavedEvent={() => {}}
        removeSavedEvent={() => {}}
        savedEvents={new Set()}
        route={EVENT_LIST}
      />
    );

    beforeEach(() => {
      navigationSpy.mockClear();
    });

    it("opens the categories filter", () => {
      output
        .find(FilterHeader)
        .props()
        .onFilterCategoriesPress();
      expect(navigationSpy).toBeCalledWith(EVENT_CATEGORIES_FILTER);
    });

    it("opens the attribute filter", () => {
      output
        .find(FilterHeader)
        .props()
        .onFilterButtonPress();
      expect(navigationSpy).toBeCalledWith(EVENT_ATTRIBUTE_FILTER);
    });

    it("opens the date filter", () => {
      output
        .find(FilterHeader)
        .props()
        .onDateFilterButtonPress();
      expect(navigationSpy).toBeCalledWith(EVENT_DATE_FILTER);
    });

    it("opens an event", () => {
      output
        .find(EventList)
        .props()
        .onPress(1);
      expect(navigationSpy).toBeCalledWith(EVENT_DETAILS, { eventId: 1 });
    });
  });
});
