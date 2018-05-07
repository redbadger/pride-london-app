import reducer from "./events";

describe("Events reducer", () => {
  it("initialises with default state", () => {
    const state = reducer(undefined, {});

    expect(state).toMatchSnapshot();
  });

  it("sets loading flag for REQUEST_CMS_DATA action", () => {
    const initialState = {
      entries: [],
      assets: [],
      loading: false,
      refreshing: false
    };
    const state = reducer(initialState, { type: "REQUEST_CMS_DATA" });

    expect(state.loading).toBe(true);
    expect(state.refreshing).toBe(false);
  });

  it("sets refreshing flag for REQUEST_UPDATE_CMS_DATA action", () => {
    const initialState = {
      entries: [],
      assets: [],
      loading: false,
      refreshing: false
    };
    const state = reducer(initialState, { type: "REQUEST_UPDATE_CMS_DATA" });

    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(true);
  });

  it("saves entries from RECEIVE_CMS_DATA action", () => {
    const initialState = {
      entries: [],
      assets: [],
      loading: true,
      refreshing: false
    };
    const newCmsData = {
      entries: [
        {
          sys: { id: "event1", contentType: { sys: { id: "event" } } },
          fields: {}
        }
      ],
      assets: [{ sys: { id: "asset1", contentType: { sys: { id: "asset" } } } }]
    };
    const state = reducer(initialState, {
      type: "RECEIVE_CMS_DATA",
      payload: newCmsData
    });

    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(false);
    expect(state.entries).toEqual(newCmsData.entries);
    expect(state.assets).toBe(newCmsData.assets);
  });

  it("expands recurring events from RECEIVE_CMS_DATA action", () => {
    const initialState = {
      entries: [],
      assets: [],
      loading: true,
      refreshing: false
    };

    const newCmsData = {
      entries: [
        {
          fields: {
            startTime: { "en-GB": "2018-08-02T00:00+00:00" },
            endTime: { "en-GB": "2018-08-02T03:00+00:00" },
            recurrenceDates: { "en-GB": ["03/08/2018"] }
          },
          sys: { id: "event1", contentType: { sys: { id: "event" } } }
        }
      ],
      assets: [{ id: "1" }]
    };
    const expected = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          endTime: { "en-GB": "2018-08-02T03:00+00:00" },
          recurrenceDates: { "en-GB": ["03/08/2018"] }
        },
        sys: { id: "event1", contentType: { sys: { id: "event" } } }
      },
      {
        fields: {
          startTime: { "en-GB": "2018-08-03T00:00+00:00" },
          endTime: { "en-GB": "2018-08-03T03:00+00:00" },
          recurrenceDates: { "en-GB": ["03/08/2018"] }
        },
        sys: {
          id: "event1-recurrence-03/08/2018",
          contentType: { sys: { id: "event" } }
        }
      }
    ];
    const state = reducer(initialState, {
      type: "RECEIVE_CMS_DATA",
      payload: newCmsData
    });

    expect(state.loading).toBe(false);
    expect(state.refreshing).toBe(false);
    expect(state.entries).toEqual(expected);
    expect(state.assets).toBe(newCmsData.assets);
  });
});
