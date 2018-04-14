import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import ConnectedTimeFilterDialog from "./ConnectedTimeFilterDialog";

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

  it("commits filters on apply", () => {
    const store = mockStore(initialState);
    const mockOnApply = jest.fn();
    const output = shallow(
      <ConnectedTimeFilterDialog
        store={store}
        onApply={mockOnApply}
        onCancel={() => {}}
        visible
      />
    );

    output
      .dive()
      .props()
      .onApply();
    const actions = store.getActions();

    expect(mockOnApply).toHaveBeenCalled();
    expect(actions).toEqual([{ type: "COMMIT_EVENT_FILTERS" }]);
  });

  it("clears filters on cancel", () => {
    const store = mockStore(initialState);
    const mockOnCancel = jest.fn();
    const output = shallow(
      <ConnectedTimeFilterDialog
        store={store}
        onApply={() => {}}
        onCancel={mockOnCancel}
        visible
      />
    );

    output
      .dive()
      .props()
      .onCancel();
    const actions = store.getActions();

    expect(mockOnCancel).toHaveBeenCalled();
    expect(actions).toEqual([{ type: "CLEAR_STAGED_EVENT_FILTERS" }]);
  });

  it("updates filters on change", () => {
    const store = mockStore(initialState);
    const output = shallow(
      <ConnectedTimeFilterDialog
        store={store}
        onApply={() => {}}
        onCancel={() => {}}
        visible
      />
    );

    output
      .dive()
      .find("CheckBox")
      .first()
      .props()
      .onChange();

    const actions = store.getActions();

    expect(actions[0]).toEqual(
      expect.objectContaining({ type: "STAGE_EVENT_FILTERS" })
    );
  });
});
