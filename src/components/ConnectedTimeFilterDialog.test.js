import React from "react";
import configureStore from "redux-mock-store";
import { shallow } from "enzyme";
import ConnectedTimeFilterDialog from "./ConnectedDateFilterDialog";

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
const mockStore = configureStore();

describe("ConnectedTimeFilterDialog", () => {
  it("renders connector", () => {
    const store = mockStore(initialState);
    const output = shallow(
      <ConnectedTimeFilterDialog
        store={store}
        onApply={() => {}}
        onCancel={() => {}}
        visible
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders component", () => {
    const store = mockStore(initialState);
    const output = shallow(
      <ConnectedTimeFilterDialog
        store={store}
        onApply={() => {}}
        onCancel={() => {}}
        visible
      />
    );
    expect(output.dive()).toMatchSnapshot();
  });
});
