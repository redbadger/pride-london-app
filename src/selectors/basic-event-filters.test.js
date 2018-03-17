// @flow
import {
  buildDateFilter,
  buildDateRangeFilter,
  buildTimeFilter
} from "./basic-event-filters";
import type { Event } from "../data/event";

const buildEvent = (startTime: string, endTime: string) =>
  (({
    fields: {
      startTime: { "en-GB": startTime },
      endTime: { "en-GB": endTime }
    }
  }: any): Event);

describe("buildDateFilter", () => {
  const event = buildEvent("2018-08-02T12:00:00", "2018-08-05T12:00:00");

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
  const event = buildEvent("2018-08-02T12:00:00", "2018-08-05T12:00:00");

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
  const event = buildEvent("2018-08-02T08:00:00", "2018-08-02T15:00:00");

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
