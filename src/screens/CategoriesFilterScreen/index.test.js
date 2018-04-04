// @flow
import React from "react";
import type { NavigationScreenProp } from "react-navigation";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import Container from "./";

const navigation: NavigationScreenProp<*> = ({}: any);

const mockStore = configureStore([thunk]);

const initialState = {
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
      time: new Set()
    },
    stagedFilters: {
      categories: new Set(),
      date: null,
      time: new Set()
    }
  }
};

describe("CategoriesFilterScreen Container", () => {
  it("dispatches stage filters action with categories payload", () => {
    const store = mockStore(initialState);
    const output = shallow(<Container store={store} navigation={navigation} />);

    output.props().onFiltersChange(["Music"]);

    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: "STAGE_EVENT_FILTERS",
        payload: {
          categories: new Set(["Music"])
        }
      }
    ]);
  });
});
