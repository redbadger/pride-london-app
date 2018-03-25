import {
  groupEventsByStartTime,
  selectEvents,
  selectFeaturedEvents,
  selectEventsLoading,
  selectEventsRefreshing,
  selectEventById,
  selectAssetById,
  selectFilteredEvents,
  selectFeaturedEventsByTitle
} from "./events";
import { buildEventFilter } from "./event-filters";

jest.mock("./event-filters", () => ({
  buildEventFilter: jest.fn()
}));

beforeEach(() => {
  buildEventFilter.mockReturnValue(() => true);
});

describe("groupEventsByStartTime", () => {
  it("returns empty array when no events exist", () => {
    const expected = [];
    const actual = groupEventsByStartTime([]);

    expect(actual).toEqual(expected);
  });

  it("separates two individual events by day and sorts", () => {
    const events = [
      {
        fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
        sys: { contentType: { sys: { id: "event" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
        sys: { contentType: { sys: { id: "event" } } }
      }
    ];

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
    const actual = groupEventsByStartTime(events);

    expect(actual).toEqual(expected);
  });

  it("leaves two events on the same day together", () => {
    const events = [
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
        sys: { contentType: { sys: { id: "event" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T10:00:00" } },
        sys: { contentType: { sys: { id: "event" } } }
      }
    ];

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
    const actual = groupEventsByStartTime(events);

    expect(actual).toEqual(expected);
  });

  it("makes two groups", () => {
    const events = [
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
    ];

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
    const actual = groupEventsByStartTime(events);

    expect(actual).toEqual(expected);
  });

  it("makes multiple groups", () => {
    const events = [
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
    ];

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
    const actual = groupEventsByStartTime(events);

    expect(actual).toEqual(expected);
  });
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

describe("selectFeaturedEventsByTitle", () => {
  const state = {
    events: {
      entries: [
        {
          fields: {
            title: { "en-GB": "Featured events" },
            events: { "en-GB": [{ sys: { id: "1" } }, { sys: { id: "2" } }] }
          },
          sys: { contentType: { sys: { id: "featuredEvents" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
          sys: { id: "1", contentType: { sys: { id: "event" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
          sys: { id: "2", contentType: { sys: { id: "event" } } }
        }
      ]
    }
  };

  it("returns empty array when no featured events with the specified title exist", () => {
    const events = selectFeaturedEventsByTitle(state, "non existant");
    expect(events).toEqual([]);
  });

  it("returns array of resolved events", () => {
    const events = selectFeaturedEventsByTitle(state, "Featured events");
    const expected = [
      {
        fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
        sys: { id: "1", contentType: { sys: { id: "event" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
        sys: { id: "2", contentType: { sys: { id: "event" } } }
      }
    ];
    expect(events).toEqual(expected);
  });
});

afterEach(() => {
  buildEventFilter.mockReset();
});
