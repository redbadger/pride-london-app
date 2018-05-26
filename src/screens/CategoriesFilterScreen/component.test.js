// @flow
import React from "react";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { shallow } from "enzyme";
import type { Event, EventCategoryName } from "../../data/event";
import Component from "./component";
import Header from "./Header";
import Button from "../../components/ButtonPrimary";
import List from "./List";

const navigation: NavigationScreenProp<*> = ({}: any);

const render = props =>
  shallow(<Component navigation={navigation} {...props} />);

describe("CategoriesFilterScreen Component", () => {
  it("renders correctly", () => {
    const events: Event[] = ([
      {
        fields: {
          name: { "en-GB": "Event name" },
          eventCategories: { "en-GB": ["Music"] }
        }
      }
    ]: any);

    const stagedCategories: Set<EventCategoryName> = new Set(["Music"]);

    const component = render({
      events,
      stagedCategories,
      onApplyFilters: () => {},
      toggleCategoryFilter: () => {},
      onClearAll: () => {}
    });

    expect(component).toMatchSnapshot();
  });

  it("closes the view and applies filters on pressing back button", () => {
    const events: Event[] = ([
      {
        fields: {
          name: { "en-GB": "Event name" },
          eventCategories: { "en-GB": ["Music"] }
        }
      }
    ]: any);

    const stagedCategories: Set<EventCategoryName> = new Set(["Music"]);
    const applySpy = jest.fn();
    const popSpy = jest.fn();
    const nav: NavigationScreenProp<NavigationState> = ({
      pop: popSpy
    }: any);
    const component = render({
      events,
      stagedCategories,
      onApplyFilters: applySpy,
      toggleCategoryFilter: () => {},
      onClearAll: () => {},
      navigation: nav
    });

    component
      .find(Header)
      .props()
      .onBack();
    expect(applySpy).toBeCalled();
    expect(popSpy).toBeCalled();
  });

  it("clears the selected categories on pressing 'Clear All'", () => {
    const events: Event[] = ([
      {
        fields: {
          name: { "en-GB": "Event name" },
          eventCategories: { "en-GB": ["Music"] }
        }
      }
    ]: any);

    const stagedCategories: Set<EventCategoryName> = new Set(["Music"]);
    const clearAllSpy = jest.fn();

    const component = render({
      events,
      stagedCategories,
      onApplyFilters: () => {},
      toggleCategoryFilter: () => {},
      onClearAll: clearAllSpy,
      onClose: () => {}
    });

    component
      .find(Header)
      .props()
      .onClearAll();
    expect(clearAllSpy).toBeCalled();
  });

  it("closes the view and applyies the filters", () => {
    const events: Event[] = ([
      {
        fields: {
          name: { "en-GB": "Event name" },
          eventCategories: { "en-GB": ["Music"] }
        }
      }
    ]: any);

    const stagedCategories: Set<EventCategoryName> = new Set(["Music"]);
    const applyFiltersSpy = jest.fn();
    const popSpy = jest.fn();
    const nav: NavigationScreenProp<NavigationState> = ({
      pop: popSpy
    }: any);
    const component = render({
      events,
      stagedCategories,
      onApplyFilters: applyFiltersSpy,
      toggleCategoryFilter: () => {},
      onClearAll: () => {},
      onClose: () => {},
      navigation: nav
    });

    component
      .find(Button)
      .props()
      .onPress();
    expect(applyFiltersSpy).toBeCalled();
    expect(popSpy).toBeCalled();
  });

  it("updates the filters when selecting a category", () => {
    const events: Event[] = ([
      {
        fields: {
          name: { "en-GB": "Event name" },
          eventCategories: { "en-GB": ["Music"] }
        }
      }
    ]: any);

    const stagedCategories: Set<EventCategoryName> = new Set(["Music"]);
    const toggleCategoryFilterSpy = jest.fn();

    const component = render({
      events,
      stagedCategories,
      onApplyFilters: () => {},
      toggleCategoryFilter: toggleCategoryFilterSpy,
      onClearAll: () => {},
      onClose: () => {}
    });

    component
      .find(List)
      .props()
      .onPress();
    expect(toggleCategoryFilterSpy).toBeCalled();
  });
});
