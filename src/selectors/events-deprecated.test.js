import { DateTime } from "luxon";
import { generateEvent, sampleArrayOf } from "../data/__test-data";
import {
  groupEventsByStartTime,
  selectEvents,
  selectFeaturedEvents,
  selectEventById,
  filterEvents,
  selectFeaturedEventsByTitle,
  uniqueEvents,
  expandRecurringEventsInEntries
} from "./events-deprecated";
import { createEventFiltersState } from "../reducers/event-filters";

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

describe("expandRecurringEventsInEntries", () => {
  it("creates new events for each recurrence date", () => {
    const events = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          endTime: { "en-GB": "2018-08-02T03:00+00:00" },
          recurrenceDates: { "en-GB": ["03/08/2018"] }
        },
        sys: { id: "event1", contentType: { sys: { id: "event" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "event2", contentType: { sys: { id: "event" } } }
      }
    ];

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
          recurrenceDates: { "en-GB": ["02/08/2018", "03/08/2018"] }
        },
        sys: {
          id: "event1-recurrence-03/08/2018",
          contentType: { sys: { id: "event" } }
        }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "event2", contentType: { sys: { id: "event" } } }
      }
    ];

    expect(expandRecurringEventsInEntries(events)).toEqual(expected);
  });

  it("creates new events for short format recurrence dates", () => {
    const events = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          endTime: { "en-GB": "2018-08-02T03:00+00:00" },
          recurrenceDates: { "en-GB": ["3/8/2018"] }
        },
        sys: { id: "event1", contentType: { sys: { id: "event" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "event2", contentType: { sys: { id: "event" } } }
      }
    ];

    const expected = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          endTime: { "en-GB": "2018-08-02T03:00+00:00" },
          recurrenceDates: { "en-GB": ["3/8/2018"] }
        },
        sys: { id: "event1", contentType: { sys: { id: "event" } } }
      },
      {
        fields: {
          startTime: { "en-GB": "2018-08-03T00:00+00:00" },
          endTime: { "en-GB": "2018-08-03T03:00+00:00" },
          recurrenceDates: { "en-GB": ["02/08/2018", "3/8/2018"] }
        },
        sys: {
          id: "event1-recurrence-3/8/2018",
          contentType: { sys: { id: "event" } }
        }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "event2", contentType: { sys: { id: "event" } } }
      }
    ];

    expect(expandRecurringEventsInEntries(events)).toEqual(expected);
  });

  it("does not create new events if they are already clones of another", () => {
    const events = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          recurrenceDates: { "en-GB": ["03/08/2018"] }
        },
        sys: {
          id: "event1-recurrence-03/08/2018",
          contentType: { sys: { id: "event" } }
        }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "event2", contentType: { sys: { id: "event" } } }
      }
    ];

    const expected = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          recurrenceDates: { "en-GB": ["03/08/2018"] }
        },
        sys: {
          id: "event1-recurrence-03/08/2018",
          contentType: { sys: { id: "event" } }
        }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "event2", contentType: { sys: { id: "event" } } }
      }
    ];

    expect(expandRecurringEventsInEntries(events)).toEqual(expected);
  });

  it("does not create new events recurrence is on the same day as start date", () => {
    const events = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          endTime: { "en-GB": "2018-08-02T04:00+00:00" },
          recurrenceDates: { "en-GB": ["02/08/2018"] }
        },
        sys: {
          id: "event1",
          contentType: { sys: { id: "event" } }
        }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "event2", contentType: { sys: { id: "event" } } }
      }
    ];

    const expected = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          endTime: { "en-GB": "2018-08-02T04:00+00:00" },
          recurrenceDates: { "en-GB": ["02/08/2018"] }
        },
        sys: {
          id: "event1",
          contentType: { sys: { id: "event" } }
        }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "event2", contentType: { sys: { id: "event" } } }
      }
    ];

    expect(expandRecurringEventsInEntries(events)).toEqual(expected);
  });

  it("updates endTime to be same distance from startTime", () => {
    const events = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          endTime: { "en-GB": "2018-08-05T03:00+00:00" },
          recurrenceDates: { "en-GB": ["06/08/2018"] }
        },
        sys: { id: "event1", contentType: { sys: { id: "event" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "event2", contentType: { sys: { id: "event" } } }
      }
    ];

    const expected = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T00:00+00:00" },
          endTime: { "en-GB": "2018-08-05T03:00+00:00" },
          recurrenceDates: { "en-GB": ["06/08/2018"] }
        },
        sys: { id: "event1", contentType: { sys: { id: "event" } } }
      },
      {
        fields: {
          startTime: { "en-GB": "2018-08-06T00:00+00:00" },
          endTime: { "en-GB": "2018-08-09T03:00+00:00" },
          recurrenceDates: { "en-GB": ["02/08/2018", "06/08/2018"] }
        },
        sys: {
          id: "event1-recurrence-06/08/2018",
          contentType: { sys: { id: "event" } }
        }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "event2", contentType: { sys: { id: "event" } } }
      }
    ];

    expect(expandRecurringEventsInEntries(events)).toEqual(expected);
  });

  it("preserves timezone of startTime and endTime", () => {
    const events = [
      {
        fields: {
          startTime: { "en-GB": "2018-04-19T23:00+14:00" },
          endTime: { "en-GB": "2018-04-20T14:48+02:00" },
          recurrenceDates: { "en-GB": ["25/04/2018"] }
        },
        sys: { id: "event1", contentType: { sys: { id: "event" } } }
      }
    ];

    const expected = [
      {
        fields: {
          startTime: { "en-GB": "2018-04-19T23:00+14:00" },
          endTime: { "en-GB": "2018-04-20T14:48+02:00" },
          recurrenceDates: { "en-GB": ["25/04/2018"] }
        },
        sys: { id: "event1", contentType: { sys: { id: "event" } } }
      },
      {
        fields: {
          startTime: { "en-GB": "2018-04-25T23:00+14:00" },
          endTime: { "en-GB": "2018-04-26T14:48+02:00" },
          recurrenceDates: { "en-GB": ["19/04/2018", "25/04/2018"] }
        },
        sys: {
          id: "event1-recurrence-25/04/2018",
          contentType: { sys: { id: "event" } }
        }
      }
    ];

    expect(expandRecurringEventsInEntries(events)).toEqual(expected);
  });

  it("does not modify entries that are not an event", () => {
    const events = [
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "entry1", contentType: { sys: { id: "notevent" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "event2", contentType: { sys: { id: "event" } } }
      }
    ];

    const expected = [
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "entry1", contentType: { sys: { id: "notevent" } } }
      },
      {
        fields: { startTime: { "en-GB": "2018-08-01T00:00+00:00" } },
        sys: { id: "event2", contentType: { sys: { id: "event" } } }
      }
    ];

    expect(expandRecurringEventsInEntries(events)).toEqual(expected);
  });
});

describe("selectEvents", () => {
  it("selects property", () => {
    const state = {
      eventFilters: createEventFiltersState(
        DateTime.fromISO("2018-07-07T00:00:00+01:00")
      ),
      data: {
        entries: [
          {
            fields: {
              startTime: { "en-GB": "2018-08-02T12:00:00" },
              endTime: { "en-GB": "2018-08-02T14:00:00" }
            },
            sys: { contentType: { sys: { id: "event" } } }
          }
        ]
      }
    };

    const selected = selectEvents(state);

    expect(selected).toEqual(state.data.entries);
  });
});

describe("selectFeaturedEvents", () => {
  it("selects property", () => {
    const state = {
      data: {
        entries: [
          {
            fields: { events: { "en-GB": [] } },
            sys: { contentType: { sys: { id: "featuredEvents" } } }
          }
        ]
      }
    };

    const selected = selectFeaturedEvents(state);

    expect(selected).toEqual(state.data.entries);
  });

  it("deduplicates events", () => {
    const state = {
      data: {
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

describe("selectEventById", () => {
  it("selects event from list", () => {
    const state = {
      eventFilters: createEventFiltersState(
        DateTime.fromISO("2018-07-07T00:00:00+01:00")
      ),
      data: {
        entries: [
          {
            fields: {
              startTime: { "en-GB": "2018-08-02T12:00:00" },
              endTime: { "en-GB": "2018-08-02T14:00:00" }
            },
            sys: { id: "1", contentType: { sys: { id: "event" } } }
          }
        ]
      }
    };

    const selected = selectEventById(state, "1");

    expect(selected).toEqual(state.data.entries[0]);
  });
});

describe("filterEvents", () => {
  it("applies the passed filter to the passed events", () => {
    const events = sampleArrayOf(generateEvent)(5);
    const filter = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    const actual = filterEvents(events, filter);

    expect(actual.length).toEqual(3);
  });
});

describe("selectFeaturedEventsByTitle", () => {
  const state = {
    eventFilters: createEventFiltersState(
      DateTime.fromISO("2018-07-07T00:00:00+01:00")
    ),
    data: {
      entries: [
        {
          fields: {
            title: { "en-GB": "Featured events" },
            events: {
              "en-GB": [
                { sys: { id: "1" } },
                { sys: { id: "2" } },
                { sys: { id: "3" } }
              ]
            }
          },
          sys: { contentType: { sys: { id: "featuredEvents" } } }
        },
        {
          fields: {
            startTime: { "en-GB": "2018-08-02T12:00:00+01:00" },
            endTime: { "en-GB": "2018-08-02T14:00:00+01:00" }
          },
          sys: { id: "1", contentType: { sys: { id: "event" } } }
        },
        {
          fields: {
            startTime: { "en-GB": "2018-08-01T12:00:00+01:00" },
            endTime: { "en-GB": "2018-08-01T14:00:00+01:00" }
          },
          sys: { id: "2", contentType: { sys: { id: "event" } } }
        },
        {
          fields: {
            startTime: { "en-GB": "2018-07-01T12:00:00+01:00" },
            endTime: { "en-GB": "2018-07-01T14:00:00+01:00" }
          },
          sys: { id: "3", contentType: { sys: { id: "event" } } }
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
        fields: {
          startTime: { "en-GB": "2018-08-02T12:00:00+01:00" },
          endTime: { "en-GB": "2018-08-02T14:00:00+01:00" }
        },
        sys: { id: "1", contentType: { sys: { id: "event" } } }
      },
      {
        fields: {
          startTime: { "en-GB": "2018-08-01T12:00:00+01:00" },
          endTime: { "en-GB": "2018-08-01T14:00:00+01:00" }
        },
        sys: { id: "2", contentType: { sys: { id: "event" } } }
      }
    ];
    expect(events).toEqual(expected);
  });

  it("filters events that are in the past", () => {
    const events = selectFeaturedEventsByTitle(state, "Featured events");
    const expected = [
      {
        fields: {
          startTime: { "en-GB": "2018-08-02T12:00:00+01:00" },
          endTime: { "en-GB": "2018-08-02T14:00:00+01:00" }
        },
        sys: { id: "1", contentType: { sys: { id: "event" } } }
      },
      {
        fields: {
          startTime: { "en-GB": "2018-08-01T12:00:00+01:00" },
          endTime: { "en-GB": "2018-08-01T14:00:00+01:00" }
        },
        sys: { id: "2", contentType: { sys: { id: "event" } } }
      }
    ];
    expect(events).toEqual(expected);
  });
});
