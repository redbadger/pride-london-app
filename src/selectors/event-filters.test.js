// @flow
import { DateTime } from "luxon";
import { generateEvent, sampleOne } from "../data/__test-data";
import type {
  Area,
  Price,
  Audience,
  VenueDetail,
  AccessibilityOption,
  FilterCollection
} from "../data/event-filters";
import type { DateRange, Time } from "../data/date-time";
import type { EventCategoryName } from "../data/event";
import {
  eventIsAfter,
  selectDateFilter,
  selectTimeFilter,
  buildEventFilter,
  selectTagFilterSelectedCount
} from "./event-filters";

export type BuildFilterCollection = {
  date?: ?DateRange,
  timeOfDay?: Set<Time>,
  categories?: Set<EventCategoryName>,
  price?: Set<Price>,
  audience?: Set<Audience>,
  venueDetails?: Set<VenueDetail>,
  accessibilityOptions?: Set<AccessibilityOption>,
  area?: Set<Area>
};

const buildFilterCollection = (
  filter: BuildFilterCollection = {}
): FilterCollection => ({
  date: filter.date || null,
  timeOfDay: filter.timeOfDay || new Set(),
  categories: filter.categories || new Set(),
  price: filter.price || new Set(),
  audience: filter.audience || new Set(),
  venueDetails: filter.venueDetails || new Set(),
  accessibilityOptions: filter.accessibilityOptions || new Set(),
  area: filter.area || new Set()
});

describe("selectDateFilter", () => {
  it("returns the date part of the eventFilters", () => {
    const date = { startDate: "2018-01-01", endDate: "2018-01-01" };
    const filter = buildFilterCollection({
      date
    });

    const actual = selectDateFilter(filter);
    expect(actual).toEqual(date);
  });
});

describe("selectTimeFilter", () => {
  it("returns the time part of the eventFilters", () => {
    const timeOfDay = new Set(["morning"]);
    const filter = buildFilterCollection({
      timeOfDay
    });

    const actual = selectTimeFilter(filter);
    expect(actual).toBe(timeOfDay);
  });
});

describe("selectTagFilterSelectedCount", () => {
  it("returns number of selected tag filters", () => {
    const filter = buildFilterCollection({
      timeOfDay: new Set(["morning"]),
      price: new Set(["free"])
    });

    const count = selectTagFilterSelectedCount(filter);
    expect(count).toBe(2);
  });
});

describe("eventIsAfter", () => {
  it("filters events before the passed date", () => {
    const date = DateTime.fromISO("2018-07-07T00:00:00+01:00");
    const event = sampleOne(generateEvent);
    event.fields.startTime = "2018-07-01T00:00:00+01:00";
    event.fields.endTime = "2018-07-01T12:00:00+01:00";

    expect(eventIsAfter(date)(event)).toEqual(false);
  });

  it("does not filter events after the passed date", () => {
    const date = DateTime.fromISO("2018-07-07T00:00:00+01:00");
    const event = sampleOne(generateEvent);
    event.fields.startTime = "2018-08-01T00:00:00+01:00";
    event.fields.endTime = "2018-08-01T12:00:00+01:00";

    expect(eventIsAfter(date)(event)).toEqual(true);
  });
});

describe("buildEventFilter", () => {
  const showEventsAfter = DateTime.fromISO("2018-07-07T00:00:00+01:00");

  it("returns a filter that only keeps events after showEventsAfter", () => {
    const onlyAfter = DateTime.fromISO("2018-07-07T12:00:00+01:00");
    const filterState = buildFilterCollection();
    const filter = buildEventFilter(onlyAfter, filterState);
    const laterEvent = sampleOne(generateEvent);
    laterEvent.fields.startTime = "2018-07-07T00:00:00+01:00";
    laterEvent.fields.endTime = "2018-07-07T12:01:00+01:00";

    const sameTimeEvent = sampleOne(generateEvent);
    sameTimeEvent.fields.startTime = "2018-07-07T00:00:00+01:00";
    sameTimeEvent.fields.endTime = "2018-07-07T12:00:00+01:00";

    const earlierEvent = sampleOne(generateEvent);
    earlierEvent.fields.startTime = "2018-07-07T00:00:00+01:00";
    earlierEvent.fields.endTime = "2018-07-07T11:59:00+01:00";

    expect(filter(laterEvent)).toEqual(true);
    expect(filter(sameTimeEvent)).toEqual(false);
    expect(filter(earlierEvent)).toEqual(false);
  });

  it("builds always truthy date filter when date is null", () => {
    const filterState = buildFilterCollection({
      date: null
    });
    const event = sampleOne(generateEvent);
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds date filter when date is a string", () => {
    const filterState = buildFilterCollection({
      date: { startDate: "2018-07-10", endDate: "2018-07-10" }
    });
    const event = sampleOne(generateEvent);
    event.fields.startTime = "2018-07-10T00:00:00+01:00";
    event.fields.endTime = "2018-07-10T12:01:00+01:00";

    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds date range filter when date is a range", () => {
    const filterState = buildFilterCollection({
      date: {
        startDate: "2018-07-10",
        endDate: "2018-07-12"
      }
    });
    const event = sampleOne(generateEvent);
    event.fields.startTime = "2018-07-09T00:00:00+01:00";
    event.fields.endTime = "2018-07-13T12:01:00+01:00";

    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds filter, which returns false when date is not in range", () => {
    const filterState = buildFilterCollection({
      date: { startDate: "2018-07-10", endDate: "2018-07-11" }
    });
    const event = sampleOne(generateEvent);
    event.fields.startTime = "2018-07-12T12:01:00+01:00";
    event.fields.endTime = "2018-07-13T12:01:00+01:00";

    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(false);
  });

  it("builds always truthy time filter when time array is empty", () => {
    const filterState = buildFilterCollection({
      timeOfDay: new Set()
    });
    const event = sampleOne(generateEvent);
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds always truthy time filter when time array contains all possible values", () => {
    const filterState = buildFilterCollection({
      timeOfDay: new Set(["morning", "afternoon", "evening"])
    });
    const event = sampleOne(generateEvent);
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds time filter, which returns true when one of the times match", () => {
    const filterState = buildFilterCollection({
      timeOfDay: new Set(["morning", "evening"])
    });
    const event = sampleOne(generateEvent);
    event.fields.startTime = "2018-07-10T06:00:00+01:00";
    event.fields.endTime = "2018-07-10T10:00:00+01:00";
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds filter, which returns false when time filter return false", () => {
    const filterState = buildFilterCollection({
      timeOfDay: new Set(["morning"])
    });
    const event = sampleOne(generateEvent);
    event.fields.startTime = "2018-07-10T14:00:00+01:00";
    event.fields.endTime = "2018-07-10T16:00:00+01:00";
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(false);
  });

  it("builds truthy price filter when price is empty", () => {
    const filterState = buildFilterCollection({
      price: new Set()
    });
    const event = sampleOne(generateEvent);
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds filter, which returns true when price filter is free and event is free", () => {
    const filterState = buildFilterCollection({
      price: new Set(["free"])
    });
    const event = sampleOne(generateEvent);
    event.fields.eventPriceLow = 0;
    event.fields.eventPriceHigh = 0;
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds filter, which returns false when price filter is free and event is not free", () => {
    const filterState = buildFilterCollection({
      price: new Set(["free"])
    });
    const event = sampleOne(generateEvent);
    event.fields.eventPriceLow = 10;
    event.fields.eventPriceHigh = 11;
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(false);
  });

  it("builds truthy audience filter when no audience selected", () => {
    const filterState = buildFilterCollection({
      audience: new Set()
    });
    const event = sampleOne(generateEvent);
    event.fields.audience = [];
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds filter, which returns true when filter contains audience of event", () => {
    const filterState = buildFilterCollection({
      audience: new Set(["18+"])
    });
    const event = sampleOne(generateEvent);
    event.fields.audience = ["18+"];
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds filter, which returns false when filter does not contain audience of event", () => {
    const filterState = buildFilterCollection({
      audience: new Set(["18+"])
    });
    const event = sampleOne(generateEvent);
    event.fields.audience = [];
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(false);
  });

  it("builds truthy venue details filter when no venue details selected", () => {
    const filterState = buildFilterCollection({
      venueDetails: new Set()
    });
    const event = sampleOne(generateEvent);
    event.fields.venueDetails = [];
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds filter, which returns false when filter does not contain venue details of event", () => {
    const filterState = buildFilterCollection({
      venueDetails: new Set(["Indoors"])
    });
    const event = sampleOne(generateEvent);
    event.fields.venueDetails = [];
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(false);
  });

  it("builds filter, which returns true when filter contains venue details of event", () => {
    const filterState = buildFilterCollection({
      venueDetails: new Set(["Indoors"])
    });
    const event = sampleOne(generateEvent);
    event.fields.venueDetails = ["Indoors"];
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds truthy accessibility options filter when no accessibility options selected", () => {
    const filterState = buildFilterCollection({
      accessibilityOptions: new Set()
    });
    const event = sampleOne(generateEvent);
    event.fields.accessibilityOptions = [];
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds filter, which returns false when accessibility options filter returns false", () => {
    const filterState = buildFilterCollection({
      accessibilityOptions: new Set(["Step free access"])
    });
    const event = sampleOne(generateEvent);
    event.fields.accessibilityOptions = [];
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(false);
  });

  it("builds filter, which returns true when venue details filter returns true", () => {
    const filterState = buildFilterCollection({
      accessibilityOptions: new Set(["Step free access"])
    });
    const event = sampleOne(generateEvent);
    event.fields.accessibilityOptions = ["Step free access"];
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds truthy area filter when no areas selected", () => {
    const filterState = buildFilterCollection({
      area: new Set()
    });
    const event = sampleOne(generateEvent);
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds filter, which returns false when area filter returns false", () => {
    const filterState = buildFilterCollection({
      area: new Set(["North"])
    });
    const event = sampleOne(generateEvent);
    event.fields.location = {
      lon: -0.14505099999996673,
      lat: 51.478269
    };
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(false);
  });

  it("builds filter, which returns true when area filter returns true", () => {
    const filterState = buildFilterCollection({
      area: new Set(["North"])
    });
    const event = sampleOne(generateEvent);
    event.fields.location = {
      lon: -0.15343029999996816,
      lat: 51.5352875
    };
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds truthy area filter when no categories are selected", () => {
    const filterState = buildFilterCollection({
      categories: new Set()
    });
    const event = sampleOne(generateEvent);
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });

  it("builds category filter, which returns false when category filter return false", () => {
    const filterState = buildFilterCollection({
      categories: new Set(["Community"])
    });
    const event = sampleOne(generateEvent);
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(false);
  });

  it("builds category filter, which returns true when category filter return true", () => {
    const filterState = buildFilterCollection({
      categories: new Set(["Community"])
    });
    const event = sampleOne(generateEvent);
    event.fields.eventCategories = ["Community"];
    const filter = buildEventFilter(showEventsAfter, filterState);
    expect(filter(event)).toBe(true);
  });
});
