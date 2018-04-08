import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import ConnectedDateFilterDialog from "./ConnectedDateFilterDialog";

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
      time: new Set(),
      price: new Set()
    },
    stagedFilters: {
      categories: new Set(),
      date: null,
      time: new Set(),
      price: new Set()
    }
  }
};
const mockStore = configureStore([thunk]);

describe("ConnectedDateFilterDialog", () => {
  it("renders connector", () => {
    const store = mockStore(initialState);
    const output = shallow(
      <ConnectedDateFilterDialog
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
      <ConnectedDateFilterDialog
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
      <ConnectedDateFilterDialog
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
      <ConnectedDateFilterDialog
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
      <ConnectedDateFilterDialog
        store={store}
        onApply={() => {}}
        onCancel={() => {}}
        visible
      />
    );

    output
      .dive()
      .find("DateRangePicker")
      .props()
      .onChange("2018-02-02");

    const actions = store.getActions();

    expect(actions).toEqual([
      { type: "STAGE_EVENT_FILTERS", payload: { date: "2018-02-02" } }
    ]);
  });
});
