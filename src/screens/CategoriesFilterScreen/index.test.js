// @flow
import React from "react";
import type { NavigationScreenProp } from "react-navigation";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import { DateTime } from "luxon";
import Container from "./";
import { createEventFiltersState } from "../../reducers/event-filters";

const navigation: NavigationScreenProp<*> = ({
  goBack: jest.fn(),
  pop: jest.fn()
}: any);

const mockStore = configureStore([thunk]);

const initialState = {
  events: {
    entries: [],
    assets: [],
    loading: true,
    refreshing: false
  },
  eventFilters: createEventFiltersState(
    DateTime.fromISO("2018-07-07T00:00:00+01:00")
  )
};

describe("CategoriesFilterScreen Container", () => {
  describe("dispatches set filters action with categories payload", () => {
    it("removes the selected category from the payload if it was already staged", () => {
      const store = mockStore(initialState);
      const output = shallow(
        <Container store={store} navigation={navigation} />
      );

      output.props().toggleCategoryFilter(new Set(["Music", "Dance"]), "Music");

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: "SET_EVENT_FILTERS",
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
          type: "SET_EVENT_FILTERS",
          payload: {
            categories: new Set(["Dance"])
          }
        }
      ]);
    });
  });
});
