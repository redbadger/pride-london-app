import {
  selectEvents,
  selectEventsLoading,
  selectEventsRefreshing
} from "./events";

describe("selectEvents", () => {
  it("selects property", () => {
    const events = [];
    const state = {
      events: {
        events
      }
    };

    const selected = selectEvents(state);

    expect(selected).toBe(events);
  });
});

describe("selectEventsLoading", () => {
  it("selects property", () => {
    const loading = true;
    const state = {
      events: {
        loading
      }
    };

    const selected = selectEventsLoading(state);

    expect(selected).toBe(loading);
  });
});

describe("selectEventsRefreshing", () => {
  it("selects property", () => {
    const refreshing = true;
    const state = {
      events: {
        refreshing
      }
    };

    const selected = selectEventsRefreshing(state);

    expect(selected).toBe(refreshing);
  });
});
