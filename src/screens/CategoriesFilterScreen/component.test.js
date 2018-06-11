// @flow
import React from "react";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { shallow } from "enzyme";
import type { EventCategoryName } from "../../data/event";
import type { Event } from "../../data/event-deprecated";
import Component from "./component";
import Header from "./Header";
import Button from "../../components/ButtonPrimary";
import List from "./List";

const navigation: NavigationScreenProp<*> = ({}: any);

const render = props =>
  shallow(<Component navigation={navigation} applyButtonText="" {...props} />);

describe("CategoriesFilterScreen Component", () => {
  const events: Event[] = ([
    {
      fields: {
        name: { "en-GB": "Event name" },
        eventCategories: { "en-GB": ["Music"] }
      }
    }
  ]: any);

  it("renders correctly", () => {
    const categories: Set<EventCategoryName> = new Set(["Music"]);

    const component = render({
      events,
      categories,
      toggleCategoryFilter: () => {},
      onClearAll: () => {}
    });

    expect(component).toMatchSnapshot();
  });

  it("renders correctly with no categories selected", () => {
    const categories: Set<EventCategoryName> = new Set();

    const component = render({
      events,
      categories,
      toggleCategoryFilter: () => {},
      onClearAll: () => {}
    });

    expect(component).toMatchSnapshot();
  });

  it("clears the selected categories on pressing 'Clear All'", () => {
    const categories: Set<EventCategoryName> = new Set(["Music"]);
    const clearAllSpy = jest.fn();

    const component = render({
      events,
      categories,
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

  it("goes back on button press", () => {
    const categories: Set<EventCategoryName> = new Set(["Music"]);
    const backSpy = jest.fn();
    const nav: NavigationScreenProp<NavigationState> = ({
      goBack: backSpy
    }: any);
    const component = render({
      events,
      categories,
      toggleCategoryFilter: () => {},
      onClearAll: () => {},
      onClose: () => {},
      navigation: nav
    });

    component
      .find(Button)
      .props()
      .onPress();
    expect(backSpy).toBeCalled();
  });

  it("updates the filters when selecting a category", () => {
    const categories: Set<EventCategoryName> = new Set(["Music"]);
    const toggleCategoryFilterSpy = jest.fn();

    const component = render({
      events,
      categories,
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
