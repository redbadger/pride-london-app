// @flow
import reducer from "./event-filters";

describe("Event filters reducer", () => {
  it("initialises with default state", () => {
    // $FlowFixMe
    const state = reducer(undefined, {});

    expect(state).toMatchSnapshot();
  });

  it("updates state with filters from payload for UPDATE_EVENT_FILTERS action", () => {
    const initialState = {
      categories: new Set(),
      date: null,
      time: new Set()
    };
    const state = reducer(initialState, {
      type: "UPDATE_EVENT_FILTERS",
      payload: {
        date: "2018-03-12"
      }
    });

    expect(state.categories).toBe(initialState.categories);
    expect(state.date).toBe("2018-03-12");
    expect(state.time).toBe(initialState.time);
  });
});
