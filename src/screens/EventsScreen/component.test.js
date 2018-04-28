// @flow
import React from "react";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import { shallow } from "enzyme";
import Component from "./component";
import FilterHeader from "../../components/ConnectedFilterHeader";
import { EVENT_CATEGORIES_FILTER } from "../../constants/routes";

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

    const loadingText = output.find("Text");

    expect(loadingText.children().text()).toEqual("Loading...");
  });

  it("opens the categories filter", () => {
    const navigationSpy = jest.fn();
    const nav: NavigationScreenProp<NavigationState> = ({
      navigate: navigationSpy
    }: any);

    const output = shallow(
      <Component
        navigation={nav}
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

    output
      .find(FilterHeader)
      .props()
      .onFilterCategoriesPress();
    expect(navigationSpy).toBeCalledWith(EVENT_CATEGORIES_FILTER);
  });
});
