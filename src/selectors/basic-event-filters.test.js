// @flow
import {
  buildCategoryFilter,
  buildDateFilter,
  buildDateRangeFilter,
  buildTimeFilter
} from "./basic-event-filters";
import type { Event } from "../data/event";

export type BuildEventArguments = {
  startTime?: string,
  endTime?: string,
  categories?: Array<string>
};

const buildEvent = ({
  startTime = "2018-08-02T12:00:00",
  endTime = "2018-08-05T12:00:00",
  categories = []
}: BuildEventArguments) =>
  (({
    fields: {
      startTime: { "en-GB": startTime },
      endTime: { "en-GB": endTime },
      eventCategories: { "en-GB": categories }
    }
  }: any): Event);

describe("buildDateFilter", () => {
  const event = buildEvent({
    startTime: "2018-08-02T12:00:00",
    endTime: "2018-08-05T12:00:00"
  });

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
  const event = buildEvent({
    startTime: "2018-08-02T12:00:00",
    endTime: "2018-08-05T12:00:00"
  });

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
  const event = buildEvent({
    startTime: "2018-08-02T08:00:00",
    endTime: "2018-08-02T15:00:00"
  });

  it("checks for morning", () => {
    const filter = buildTimeFilter("morning");
    expect(filter(event)).toBe(true);
  });

  it("checks for afternoon", () => {
    const filter = buildTimeFilter("afternoon");
    expect(filter(event)).toBe(true);
  });

  it("checks for evening", () => {
    const filter = buildTimeFilter("evening");
    expect(filter(event)).toBe(false);
  });
});

describe("buildCategoryFilter", () => {
  const eventWithNoCategory = buildEvent({ categories: [] });
  const eventWithOneCategory = buildEvent({ categories: ["Community"] });
  const eventWithMulitpleCategories = buildEvent({
    categories: ["Community", "Health"]
  });

  describe("when categories filter is an empty set", () => {
    it("allows any event", () => {
      const filter = buildCategoryFilter(new Set());
      expect(filter(eventWithNoCategory)).toBe(true);
      expect(filter(eventWithOneCategory)).toBe(true);
      expect(filter(eventWithMulitpleCategories)).toBe(true);
    });
  });

  describe("when categories filter contains one value", () => {
    it("allows events which contain the same category", () => {
      const filter = buildCategoryFilter(new Set(["Community"]));
      expect(filter(eventWithNoCategory)).toBe(false);
      expect(filter(eventWithOneCategory)).toBe(true);
      expect(filter(eventWithMulitpleCategories)).toBe(true);
    });

    it("does not allow events which do not match the category", () => {
      const filter = buildCategoryFilter(new Set(["Nightlife"]));
      expect(filter(eventWithNoCategory)).toBe(false);
      expect(filter(eventWithOneCategory)).toBe(false);
      expect(filter(eventWithMulitpleCategories)).toBe(false);
    });
  });

  describe("when categories filter contains multiple values", () => {
    it("allows only events which contain one of the same categories", () => {
      const filter = buildCategoryFilter(new Set(["Community", "Music"]));
      expect(filter(eventWithNoCategory)).toBe(false);
      expect(filter(eventWithOneCategory)).toBe(true);
      expect(filter(eventWithMulitpleCategories)).toBe(true);
    });
  });
});
