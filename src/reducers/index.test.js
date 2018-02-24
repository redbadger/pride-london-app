import reducer from "./";

describe("Root reducer", () => {
  it("initialises with default state", () => {
    // $FlowFixMe
    const state = reducer(undefined, {});

    expect(state).toMatchSnapshot();
  });

  it("sets loading flag for REQUEST_EVENTS action", () => {
    const initialState = {
      events: [],
      loading: false,
      refreshing: false
    };
    const state = reducer(initialState, { type: "REQUEST_EVENTS" });

    expect(state.loading).toBe(true);
    expect(state.refreshing).toBe(false);
  });

  it("saves events from RECEIVE_EVENTS action", () => {
    const initialState = {
      events: [],
      loading: true,
      refreshing: false
    };
    const newEvents = [{ id: "1" }];
    const state = reducer(initialState, {
      type: "RECEIVE_EVENTS",
      payload: { events: newEvents }
    });

    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(false);
    expect(state.events).toBe(newEvents);
  });
});
