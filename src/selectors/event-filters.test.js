// @flow
import {
  selectDateFilter,
  selectTimeFilter,
  buildDateFilter,
  buildDateRangeFilter,
  buildDateOrDateRangeFilter,
  buildTimeFilter,
  buildEventFilter
} from "./event-filters";
import type { Event } from "../data/event";

const buildState = ({ date, time }) => ({
  events: {
    events: [],
    loading: false,
    refreshing: false
  },
  eventFilters: {
    date,
    time
  }
});

describe("selectDateFilter", () => {
  it("returns the date part of the eventFilters", () => {
    const state = buildState({
      date: "2018-01-01",
      time: ["morning"]
    });

    const actual = selectDateFilter(state);
    expect(actual).toBe("2018-01-01");
  });
});

describe("selectTimeFilter", () => {
  it("returns the time part of the eventFilters", () => {
    const state = buildState({
      date: "2018-01-01",
      time: ["morning"]
    });

    const actual = selectTimeFilter(state);
    expect(actual).toEqual(["morning"]);
  });
});

describe("buildDateFilter", () => {
  const partialEvent = {
    fields: {
      startTime: { "en-GB": "2018-08-02T12:00:00" },
      endTime: { "en-GB": "2018-08-05T12:00:00" }
    }
  };
  const event = ((partialEvent: any): Event);

  it("returns true when event starts on the given date", () => {
    const filter = buildDateFilter("2018-08-02");
    expect(filter(event)).toBe(true);
  });

  it("returns true when event ends on the given date", () => {
    const filter = buildDateFilter("2018-08-05");
    expect(filter(event)).toBe(true);
  });

  it("returns true when event starts before and ends after the given date", () => {
    const filter = buildDateFilter("2018-08-04");
    expect(filter(event)).toBe(true);
  });

  it("returns false otherwise", () => {
    const filter = buildDateFilter("2018-08-10");
    expect(filter(event)).toBe(false);
  });
});

describe("buildDateRangeFilter", () => {
  const partialEvent = {
    fields: {
      startTime: { "en-GB": "2018-08-02T12:00:00" },
      endTime: { "en-GB": "2018-08-05T12:00:00" }
    }
  };
  const event = ((partialEvent: any): Event);

  it("returns true when event starts within the given range", () => {
    const filter = buildDateRangeFilter({
      startDate: "2018-08-01",
      endDate: "2018-08-04"
    });
    expect(filter(event)).toBe(true);
  });

  it("returns true when event ends within the given range", () => {
    const filter = buildDateRangeFilter({
      startDate: "2018-08-04",
      endDate: "2018-08-10"
    });
    expect(filter(event)).toBe(true);
  });

  it("returns true when event starts before and ends after the given range", () => {
    const filter = buildDateRangeFilter({
      startDate: "2018-08-01",
      endDate: "2018-08-10"
    });
    expect(filter(event)).toBe(true);
  });

  it("returns false otherwise", () => {
    const filter = buildDateRangeFilter({
      startDate: "2018-07-29",
      endDate: "2018-08-01"
    });
    expect(filter(event)).toBe(false);
  });
});

describe("buildTimeFilter", () => {
  const partialEvent = {
    fields: {
      startTime: { "en-GB": "2018-08-02T08:00:00" },
      endTime: { "en-GB": "2018-08-02T15:00:00" }
    }
  };
  const event = ((partialEvent: any): Event);

  it("checks for morning", () => {
    const filter = buildTimeFilter(["morning"]);
    expect(filter(event)).toBe(true);
  });

  it("checks for afternoon", () => {
    const filter = buildTimeFilter(["afternoon"]);
    expect(filter(event)).toBe(true);
  });

  it("checks for evening", () => {
    const filter = buildTimeFilter(["evening"]);
    expect(filter(event)).toBe(false);
  });

  it("combines multiple times with OR", () => {
    const filter = buildTimeFilter(["morning", "evening"]);
    expect(filter(event)).toBe(true);
  });
});
