// @flow
import reducer from "./event-filters";

describe("Event filters reducer", () => {
  it("initialises with default state", () => {
    // $FlowFixMe
    const state = reducer(undefined, {});

    expect(state).toMatchSnapshot();
  });

  it("updates state with filters from payload for STAGE_EVENT_FILTERS action", () => {
    const initialState = {
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
    };
    const state = reducer(initialState, {
      type: "STAGE_EVENT_FILTERS",
      payload: {
        date: { startDate: "2018-03-12", endDate: "2018-03-12" }
      }
    });

    expect(state.stagedFilters.categories).toBe(
      initialState.stagedFilters.categories
    );
    expect(state.stagedFilters.date).toEqual({
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    });
    expect(state.stagedFilters.time).toBe(initialState.stagedFilters.time);
  });

  it("updates state with filters from payload for COMMIT_EVENT_FILTERS action", () => {
    const initialState = {
      selectedFilters: {
        categories: new Set(),
        date: null,
        time: new Set()
      },
      stagedFilters: {
        categories: new Set(),
        date: { startDate: "2018-03-12", endDate: "2018-03-12" },
        time: new Set()
      }
    };
    const state = reducer(initialState, {
      type: "COMMIT_EVENT_FILTERS"
    });

    expect(state.stagedFilters.date).toEqual({
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    });
    expect(state.selectedFilters.date).toEqual({
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    });
    // this is used by selectIsStagingFilters
    expect(state.stagedFilters).toBe(state.selectedFilters);
  });

  it("updates state with filters from payload for CLEAR_STAGED_EVENT_FILTERS action", () => {
    const initialState = {
      selectedFilters: {
        categories: new Set(),
        date: { startDate: "2018-03-12", endDate: "2018-03-12" },
        time: new Set()
      },
      stagedFilters: {
        categories: new Set(),
        date: { startDate: "2018-03-20", endDate: "2018-03-20" },
        time: new Set()
      }
    };
    const state = reducer(initialState, {
      type: "CLEAR_STAGED_EVENT_FILTERS"
    });

    expect(state.stagedFilters.date).toEqual({
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    });
    expect(state.selectedFilters.date).toEqual({
      startDate: "2018-03-12",
      endDate: "2018-03-12"
    });
    // this is used by selectIsStagingFilters
    expect(state.stagedFilters).toBe(state.selectedFilters);
  });
});
