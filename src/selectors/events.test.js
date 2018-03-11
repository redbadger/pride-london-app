import {
  selectEvents,
  selectFeaturedEvents,
  selectEventsLoading,
  selectEventsRefreshing,
  selectEventById,
  selectAssetById
} from "./events";

describe("selectEvents", () => {
  it("selects property", () => {
    const data = {
      entries: [{ sys: { contentType: { sys: { id: "event" } } } }]
    };
    const state = {
      events: {
        data
      }
    };

    const selected = selectEvents(state);

    expect(selected).toEqual(data.entries);
  });
});

describe("selectFeaturedEvents", () => {
  it("selects property", () => {
    const data = {
      entries: [{ sys: { contentType: { sys: { id: "featuredEvents" } } } }]
    };
    const state = {
      events: {
        data
      }
    };

    const selected = selectFeaturedEvents(state);

    expect(selected).toEqual(data.entries);
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

describe("selectEventById", () => {
  it("selects event from list", () => {
    const data = {
      entries: [{ sys: { id: "1", contentType: { sys: { id: "event" } } } }]
    };
    const state = {
      events: {
        data
      }
    };

    const selected = selectEventById(state, "1");

    expect(selected).toEqual(data.entries[0]);
  });
});

describe("selectAssetById", () => {
  it("selects asset from list", () => {
    const data = {
      assets: [{ sys: { id: "1" } }]
    };
    const state = {
      events: {
        data
      }
    };

    const selected = selectAssetById(state, "1");

    expect(selected).toEqual(data.assets[0]);
  });
});
