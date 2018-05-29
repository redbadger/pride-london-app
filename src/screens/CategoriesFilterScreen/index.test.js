// @flow
import React from "react";
import type { NavigationScreenProp } from "react-navigation";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import { DateTime } from "luxon";
import Container from "./";

const navigation: NavigationScreenProp<*> = ({ goBack: jest.fn() }: any);

const mockStore = configureStore([thunk]);

const initialState = {
  globalFilters: {
    hideEventsBefore: DateTime.fromISO("2018-07-07T00:00:00+01:00")
  },
  events: {
    entries: [],
    assets: [],
    loading: true,
    refreshing: false
  },
  eventFilters: {
    selectedFilters: {
      categories: new Set(),
      date: null,
      timeOfDay: new Set(),
      price: new Set(),
      audience: new Set(),
      venueDetails: new Set(),
      accessibilityOptions: new Set(),
      area: new Set()
    },
    stagedFilters: {
      categories: new Set(),
      date: null,
      timeOfDay: new Set(),
      price: new Set(),
      audience: new Set(),
      venueDetails: new Set(),
      accessibilityOptions: new Set(),
      area: new Set()
    }
  }
};

describe("CategoriesFilterScreen Container", () => {
  describe("dispatches stage filters action with categories payload", () => {
    it("removes the selected category from the payload if it was already staged", () => {
      const store = mockStore(initialState);
      const output = shallow(
        <Container store={store} navigation={navigation} />
      );

      output.props().toggleCategoryFilter(new Set(["Music", "Dance"]), "Music");

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: "STAGE_EVENT_FILTERS",
          payload: {
            categories: new Set(["Dance"])
          }
        }
      ]);
    });

    it("adds the selected category to the payload if it was not already staged", () => {
      const store = mockStore(initialState);
      const output = shallow(
        <Container store={store} navigation={navigation} />
      );

      output.props().toggleCategoryFilter(new Set(["Music", "Dance"]), "Music");

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: "STAGE_EVENT_FILTERS",
          payload: {
            categories: new Set(["Dance"])
          }
        }
      ]);
    });
  });

  it("dispatches commit filters action to apply filters", () => {
    const store = mockStore(initialState);
    const output = shallow(<Container store={store} navigation={navigation} />);

    output.props().onApplyFilters();

    const actions = store.getActions();

    expect(actions).toEqual([{ type: "COMMIT_EVENT_FILTERS" }]);
  });

  it("dispatches clear staged filters action and closes filter screen", () => {
    const store = mockStore(initialState);
    const output = shallow(<Container store={store} navigation={navigation} />);

    output
      .dive()
      .find("Header")
      .props()
      .onClose();

    const actions = store.getActions();

    expect(navigation.goBack).toBeCalled();
    expect(actions).toEqual([{ type: "CLEAR_STAGED_EVENT_FILTERS" }]);
  });
});
