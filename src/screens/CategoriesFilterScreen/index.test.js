// @flow
import React from "react";
import type { NavigationScreenProp } from "react-navigation";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import Container from "./";

const navigation: NavigationScreenProp<*> = ({ goBack: jest.fn() }: any);

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

    output.props().onFiltersChange(new Set(["Music"]));

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
