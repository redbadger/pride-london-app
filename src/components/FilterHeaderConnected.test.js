import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import FilterHeader from "./FilterHeaderConnected";

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

const mockStore = configureStore([thunk]);

describe("ConnectedFilterHeader", () => {
  it("renders connector", () => {
    const store = mockStore(initialState);
    const output = shallow(<FilterHeader store={store} />);
    expect(output).toMatchSnapshot();
  });

  it("renders component", () => {
    const store = mockStore(initialState);
    const output = shallow(<FilterHeader store={store} />);
    expect(output.dive()).toMatchSnapshot();
  });
});
