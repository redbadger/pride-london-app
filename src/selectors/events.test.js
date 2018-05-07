import parseDate from "date-fns/parse";
import {
  getTimePeriod,
  groupEventsByStartTime,
  groupPerformancesByPeriod,
  selectEvents,
  selectFeaturedEvents,
  selectEventsLoading,
  selectEventsRefreshing,
  selectEventById,
  selectAssetById,
  selectFilteredEvents,
  selectFeaturedEventsByTitle,
  uniqueEvents,
  selectSavedEvents,
  expandRecurringEvents
} from "./events";
import { buildEventFilter } from "./event-filters";

jest.mock("./event-filters", () => ({
  buildEventFilter: jest.fn()
}));

beforeEach(() => {
  buildEventFilter.mockReturnValue(() => true);
});

describe("uniqueEvents", () => {
  it("returns empty array when no events exist", () => {
    const expected = [];
    const actual = uniqueEvents([]);

    expect(actual).toEqual(expected);
  });

  it("removes events with the same sys.id", () => {
    const expected = [
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
        sys: { id: "abc", contentType: { sys: { id: "event" } } }
      }
    ];
    const actual = uniqueEvents([
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
        sys: { id: "abc", contentType: { sys: { id: "event" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
        sys: { id: "abc", contentType: { sys: { id: "event" } } }
      }
    ]);

    expect(actual).toEqual(expected);
  });

  it("keeps events with the different sys.id", () => {
    const expected = [
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
        sys: { id: "abc", contentType: { sys: { id: "event" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
        sys: { id: "def", contentType: { sys: { id: "event" } } }
      }
    ];
    const actual = uniqueEvents([
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
        sys: { id: "abc", contentType: { sys: { id: "event" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
        sys: { id: "def", contentType: { sys: { id: "event" } } }
      }
    ]);

    expect(actual).toEqual(expected);
  });
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

describe("expandRecurringEvents", () => {
  it("creates new events for each recurring date at midnight", () => {
    const events = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          recurrenceDates: { "en-GB": ["03/08/2018"] }
        },
        sys: { contentType: { sys: { id: "event1" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { contentType: { sys: { id: "event2" } } }
      }
    ];

    const expected = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          recurrenceDates: { "en-GB": ["03/08/2018"] }
        },
        sys: { contentType: { sys: { id: "event1" } } }
      },
      {
        fields: {
          startTime: { "en-GB": "2018-08-03T00:00+00:00" },
          recurrenceDates: undefined
        },
        sys: { contentType: { sys: { id: "event1-03/08/2018" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { contentType: { sys: { id: "event2" } } }
      }
    ];

    expect(expandRecurringEvents(events)).toEqual(expected);
  });
});

describe("getTimePeriod", () => {
  it("5:59am is Evening (late)", () => {
    const expected = "Evening";
    const actual = getTimePeriod(parseDate("2018-01-01T05:59"));

    expect(actual).toEqual(expected);
  });
  it("6:00am is Morning", () => {
    const expected = "Morning";
    const actual = getTimePeriod(parseDate("2018-01-01T06:00"));

    expect(actual).toEqual(expected);
  });
  it("11:59am is Morning", () => {
    const expected = "Morning";
    const actual = getTimePeriod(parseDate("2018-01-01T11:59"));

    expect(actual).toEqual(expected);
  });
  it("12:00am is Afternoon", () => {
    const expected = "Afternoon";
    const actual = getTimePeriod(parseDate("2018-01-01T12:00"));

    expect(actual).toEqual(expected);
  });
  it("5:59pm is Afternoon", () => {
    const expected = "Afternoon";
    const actual = getTimePeriod(parseDate("2018-01-01T17:59"));

    expect(actual).toEqual(expected);
  });
  it("6:00pm is Evening", () => {
    const expected = "Evening";
    const actual = getTimePeriod(parseDate("2018-01-01T18:00"));

    expect(actual).toEqual(expected);
  });
});

describe("groupPerformancesByPeriod", () => {
  it("returns empty array when no performances exist", () => {
    const expected = [];
    const actual = groupPerformancesByPeriod([]);

    expect(actual).toEqual(expected);
  });

  it("separates two individual performances by period and sorts", () => {
    const performances = [
      {
        fields: { startTime: { "en-GB": "2018-08-01T18:01:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T13:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      }
    ];

    const expected = [
      [
        {
          fields: { startTime: { "en-GB": "2018-08-01T13:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        }
      ],
      [
        {
          fields: { startTime: { "en-GB": "2018-08-01T18:01:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        }
      ]
    ];
    const actual = groupPerformancesByPeriod(performances);

    expect(actual).toEqual(expected);
  });

  it("leaves two performances in the same period together", () => {
    const performances = [
      {
        fields: { startTime: { "en-GB": "2018-08-01T09:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T10:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      }
    ];

    const expected = [
      [
        {
          fields: { startTime: { "en-GB": "2018-08-01T09:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-01T10:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        }
      ]
    ];
    const actual = groupPerformancesByPeriod(performances);

    expect(actual).toEqual(expected);
  });

  it("makes two groups", () => {
    const performances = [
      {
        fields: { startTime: { "en-GB": "2018-08-01T07:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T11:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T10:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T19:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T18:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      }
    ];

    const expected = [
      [
        {
          fields: { startTime: { "en-GB": "2018-08-01T07:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-01T10:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-01T11:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        }
      ],
      [
        {
          fields: { startTime: { "en-GB": "2018-08-01T18:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-01T19:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        }
      ]
    ];
    const actual = groupPerformancesByPeriod(performances);

    expect(actual).toEqual(expected);
  });

  it("makes multiple groups", () => {
    const performances = [
      {
        fields: { startTime: { "en-GB": "2018-08-01T18:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T11:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-02T02:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T11:30:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T19:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T13:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
        sys: { contentType: { sys: { id: "performance" } } }
      }
    ];

    const expected = [
      [
        {
          fields: { startTime: { "en-GB": "2018-08-01T11:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-01T11:30:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        }
      ],
      [
        {
          fields: { startTime: { "en-GB": "2018-08-01T13:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        }
      ],
      [
        {
          fields: { startTime: { "en-GB": "2018-08-01T18:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-01T19:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        },
        {
          fields: { startTime: { "en-GB": "2018-08-02T02:00:00" } },
          sys: { contentType: { sys: { id: "performance" } } }
        }
      ]
    ];
    const actual = groupPerformancesByPeriod(performances);

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
        entries: [
          {
            fields: { events: { "en-GB": [] } },
            sys: { contentType: { sys: { id: "featuredEvents" } } }
          }
        ]
      }
    };

    const selected = selectFeaturedEvents(state);

    expect(selected).toEqual(state.events.entries);
  });

  it("deduplicates events", () => {
    const state = {
      events: {
        entries: [
          {
            fields: {
              events: {
                "en-GB": [
                  {
                    sys: {
                      type: "Link",
                      linkType: "Entry",
                      id: "3O3SZPgYl2MUEWu2MoK2oi"
                    }
                  },
                  {
                    sys: {
                      type: "Link",
                      linkType: "Entry",
                      id: "3O3SZPgYl2MUEWu2MoK2oi"
                    }
                  }
                ]
              }
            },
            sys: { contentType: { sys: { id: "featuredEvents" } } }
          }
        ]
      }
    };

    const selected = selectFeaturedEvents(state);

    expect(selected[0].fields.events["en-GB"]).toEqual([
      { sys: { type: "Link", linkType: "Entry", id: "3O3SZPgYl2MUEWu2MoK2oi" } }
    ]);
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
    expect(buildEventFilter).toHaveBeenCalledWith(state, false);
    expect(mockFilter).toHaveBeenCalledTimes(2);
  });

  it("filters events using the buildEventFilter function with staged filters", () => {
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
    const actual = selectFilteredEvents(state, true);

    expect(actual).toEqual(expected);
    expect(buildEventFilter).toHaveBeenCalledWith(state, true);
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

describe("mapSavedIDsToEvents", () => {
  it("returns empty array when no savedEvents", () => {
    const state = {
      events: {
        entries: [
          {
            fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
            sys: { id: "1", contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
            sys: { id: "2", contentType: { sys: { id: "event" } } }
          }
        ]
      },
      savedEvents: new Set([])
    };

    const expected = [];
    const actual = selectSavedEvents(state);

    expect(actual).toEqual(expected);
  });

  it("returns array of saved events", () => {
    const state = {
      events: {
        entries: [
          {
            fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
            sys: { id: "1", contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
            sys: { id: "2", contentType: { sys: { id: "event" } } }
          }
        ]
      },
      savedEvents: new Set(["1"])
    };

    const expected = [
      {
        fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
        sys: { id: "1", contentType: { sys: { id: "event" } } }
      }
    ];
    const actual = selectSavedEvents(state);

    expect(actual).toEqual(expected);
  });

  it("returns array of saved events", () => {
    const state = {
      events: {
        entries: [
          {
            fields: { startTime: { "en-GB": "2018-08-02T00:00:00" } },
            sys: { id: "1", contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
            sys: { id: "2", contentType: { sys: { id: "event" } } }
          },
          {
            fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
            sys: { id: "3", contentType: { sys: { id: "event" } } }
          }
        ]
      },
      savedEvents: new Set(["3", "2"])
    };

    const expected = [
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
        sys: { id: "2", contentType: { sys: { id: "event" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00:00" } },
        sys: { id: "3", contentType: { sys: { id: "event" } } }
      }
    ];
    const actual = selectSavedEvents(state);

    expect(actual).toEqual(expected);
  });
});
