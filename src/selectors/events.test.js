import {
  selectEvents,
  selectFeaturedEvents,
  selectEventsLoading,
  selectEventsRefreshing,
  selectEventById,
  selectAssetById,
  selectFilteredEvents,
  selectFilteredEventsGroupedByDay
} from "./events";
import { buildEventFilter } from "./event-filters";

jest.mock("./event-filters", () => ({
  buildEventFilter: jest.fn()
}));

beforeEach(() => {
  buildEventFilter.mockReturnValue(() => true);
});

describe("selectEvents", () => {
  it("selects property", () => {
    const state = {
      events: {
        entries: [{ sys: { contentType: { sys: { id: "event" } } } }]
      }
    };

    const selected = selectEvents(state);

    expect(selected).toEqual(state.events.entries);
  });
});

describe("selectFeaturedEvents", () => {
  it("selects property", () => {
    const state = {
      events: {
        entries: [{ sys: { contentType: { sys: { id: "featuredEvents" } } } }]
      }
    };

    const selected = selectFeaturedEvents(state);

    expect(selected).toEqual(state.events.entries);
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
    const state = {
      events: {
        entries: [{ sys: { id: "1", contentType: { sys: { id: "event" } } } }]
      }
    };

    const selected = selectEventById(state, "1");

    expect(selected).toEqual(state.events.entries[0]);
  });
});

describe("selectAssetById", () => {
  it("selects asset from list", () => {
    const state = {
      events: {
        assets: [{ sys: { id: "1" } }]
      }
    };

    const selected = selectAssetById(state, "1");

    expect(selected).toEqual(state.events.assets[0]);
  });
});

describe("selectFilteredEvents", () => {
  it("filters events using the buildEventFilter function", () => {
    const mockFilter = jest
      .fn()
      .mockReturnValue(false)
      .mockReturnValueOnce(true);
    buildEventFilter.mockReturnValue(mockFilter);

    const state = {
      events: {
        entries: [
          {
            fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          }
        ]
      }
    };

    const expected = [
      {
        fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
        sys: { contentType: { sys: { id: "event" } } }
      }
    ];
    const actual = selectFilteredEvents(state);

    expect(actual).toEqual(expected);
    expect(buildEventFilter).toHaveBeenCalledWith(state);
    expect(mockFilter).toHaveBeenCalledTimes(2);
  });
});

describe("selectFilteredEventsGroupedByDay", () => {
  it("returns empty array when no events exist", () => {
    const state = {
      events: {
        entries: []
      }
    };

    const expected = [];
    const actual = selectFilteredEventsGroupedByDay(state);

    expect(actual).toEqual(expected);
  });

  it("separates two individual events by day and sorts", () => {
    const state = {
      events: {
        entries: [
          {
            fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          }
        ]
      }
    };

    const expected = [
      [
        {
          fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        }
      ],
      [
        {
          fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        }
      ]
    ];
    const actual = selectFilteredEventsGroupedByDay(state);

    expect(actual).toEqual(expected);
  });

  it("leaves two events on the same day together", () => {
    const state = {
      events: {
        entries: [
          {
            fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-01T10:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          }
        ]
      }
    };

    const expected = [
      [
        {
          fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-01T10:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        }
      ]
    ];
    const actual = selectFilteredEventsGroupedByDay(state);

    expect(actual).toEqual(expected);
  });
  it("makes two groups", () => {
    const state = {
      events: {
        entries: [
          {
            fields: { startTime: { "en-GB": "2018-08-01T02:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-02T02:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-02T03:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-01T02:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          }
        ]
      }
    };

    const expected = [
      [
        {
          fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-01T02:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-01T02:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        }
      ],
      [
        {
          fields: { startTime: { "en-GB": "2018-08-02T02:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-02T03:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        }
      ]
    ];
    const actual = selectFilteredEventsGroupedByDay(state);

    expect(actual).toEqual(expected);
  });

  it("makes multiple groups", () => {
    const state = {
      events: {
        entries: [
          {
            fields: { startTime: { "en-GB": "2018-08-01T02:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-02T02:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-02T03:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-05T02:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-04T00:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-03T03:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-04T02:00:00" } },
            sys: { contentType: { sys: { id: "event" } } }
          }
        ]
      }
    };

    const expected = [
      [
        {
          fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-01T02:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        }
      ],
      [
        {
          fields: { startTime: { "en-GB": "2018-08-02T02:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-02T03:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        }
      ],
      [
        {
          fields: { startTime: { "en-GB": "2018-08-03T03:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        }
      ],
      [
        {
          fields: { startTime: { "en-GB": "2018-08-04T00:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-04T02:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        }
      ],
      [
        {
          fields: { startTime: { "en-GB": "2018-08-05T02:00:00" } },
          sys: { contentType: { sys: { id: "event" } } }
        }
      ]
    ];
    const actual = selectFilteredEventsGroupedByDay(state);

    expect(actual).toEqual(expected);
  });
});

afterEach(() => {
  buildEventFilter.mockReset();
});
