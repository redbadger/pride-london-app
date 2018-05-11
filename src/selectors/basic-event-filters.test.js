// @flow
import {
  buildCategoryFilter,
  buildDateRangeFilter,
  buildTimeFilter,
  buildPriceFilter,
  buildStringSetFilter,
  buildAreaFilter
} from "./basic-event-filters";
import type { Event, EventCategoryName } from "../data/event";

export type BuildEventArguments = {
  startTime?: string,
  endTime?: string,
  eventCategories?: Array<EventCategoryName>,
  eventPriceLow?: number,
  eventPriceHigh?: number,
  location?: {
    lat: number,
    lon: number
  }
};

const buildEvent = ({
  startTime = "2018-08-02T12:00:00",
  endTime = "2018-08-05T12:00:00",
  eventCategories = [],
  eventPriceLow = 0,
  eventPriceHigh = 12,
  location = {
    lon: -0.15343029999996816,
    lat: 51.5352875
  }
}: BuildEventArguments) =>
  (({
    fields: {
      startTime: { "en-GB": startTime },
      endTime: { "en-GB": endTime },
      eventCategories: { "en-GB": eventCategories },
      eventPriceLow: { "en-GB": eventPriceLow },
      eventPriceHigh: { "en-GB": eventPriceHigh },
      location: { "en-GB": location }
    }
  }: any): Event);

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

describe("bug busting the buildTimeFilter for events that end at midnight", () => {
  const buggyEvent = buildEvent({
    startTime: "2018-08-02T14:00:00",
    endTime: "2018-08-03T00:00:00"
  });

  // const happyEvent = buildEvent({
  //   startTime: "2018-08-02T14:00:00",
  //   endTime: "2018-08-02T23:59:00"
  // });

  it("checks for bugs in the morning", () => {
    const filter = buildTimeFilter("morning");
    expect(filter(buggyEvent)).toBe(false);
  });

  it("checks for bugs in the afternoon", () => {
    const filter = buildTimeFilter("afternoon");
    expect(filter(buggyEvent)).toBe(true);
  });

  it("checks for bugs in the evening", () => {
    const filter = buildTimeFilter("evening");
    expect(filter(buggyEvent)).toBe(true);
  });
});

// TODO - Create events that span varying times

describe("buildCategoryFilter", () => {
  const eventWithNoCategory = buildEvent({ eventCategories: [] });
  const eventWithOneCategory = buildEvent({ eventCategories: ["Community"] });
  const eventWithMulitpleCategories = buildEvent({
    eventCategories: ["Community", "Health"]
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

describe("buildPriceFilter", () => {
  it("filters events that are not free", () => {
    const event = buildEvent({
      eventPriceLow: 0,
      eventPriceHigh: 12
    });
    const filter = buildPriceFilter();
    expect(filter(event)).toBe(false);
  });

  it("does not filter events that are free", () => {
    const event = buildEvent({
      eventPriceLow: 0,
      eventPriceHigh: 0
    });
    const filter = buildPriceFilter();
    expect(filter(event)).toBe(true);
  });
});

describe("buildStringSetFilter", () => {
  const eventWithNoValues = buildEvent({ eventCategories: [] });
  const eventWithOneValue = buildEvent({ eventCategories: ["Community"] });
  const eventWithMulitpleValues = buildEvent({
    eventCategories: ["Community", "Health"]
  });

  describe("when string set filter is an empty set", () => {
    it("allows any event", () => {
      const filter = buildStringSetFilter("eventCategories", new Set());
      expect(filter(eventWithNoValues)).toBe(true);
      expect(filter(eventWithOneValue)).toBe(true);
      expect(filter(eventWithMulitpleValues)).toBe(true);
    });
  });

  describe("when string set filter contains one value", () => {
    it("allows events which contain the same category", () => {
      const filter = buildStringSetFilter(
        "eventCategories",
        new Set(["Community"])
      );
      expect(filter(eventWithNoValues)).toBe(false);
      expect(filter(eventWithOneValue)).toBe(true);
      expect(filter(eventWithMulitpleValues)).toBe(true);
    });

    it("does not allow events which do not match the value", () => {
      const filter = buildStringSetFilter(
        "eventCategories",
        new Set(["Nightlife"])
      );
      expect(filter(eventWithNoValues)).toBe(false);
      expect(filter(eventWithOneValue)).toBe(false);
      expect(filter(eventWithMulitpleValues)).toBe(false);
    });
  });

  describe("when string set filter contains multiple values", () => {
    it("allows only events which contain one of the same categories", () => {
      const filter = buildStringSetFilter(
        "eventCategories",
        new Set(["Community", "Music"])
      );
      expect(filter(eventWithNoValues)).toBe(false);
      expect(filter(eventWithOneValue)).toBe(true);
      expect(filter(eventWithMulitpleValues)).toBe(true);
    });
  });
});

describe("buildAreaFilter", () => {
  it("checks for North", () => {
    const event = buildEvent({
      location: {
        lon: -0.15343029999996816,
        lat: 51.5352875
      }
    });
    expect(buildAreaFilter("North")(event)).toBe(true);
    expect(buildAreaFilter("South")(event)).toBe(false);
  });

  it("checks for South", () => {
    const event = buildEvent({
      location: {
        lon: -0.14505099999996673,
        lat: 51.478269
      }
    });
    expect(buildAreaFilter("South")(event)).toBe(true);
    expect(buildAreaFilter("North")(event)).toBe(false);
  });

  it("checks for East", () => {
    const event = buildEvent({
      location: {
        lon: -0.032449100000008,
        lat: 51.5126187
      }
    });
    expect(buildAreaFilter("East")(event)).toBe(true);
    expect(buildAreaFilter("West")(event)).toBe(false);
  });

  it("checks for West", () => {
    const event = buildEvent({
      location: {
        lon: -0.21075725555419922,
        lat: 51.49629375642361
      }
    });
    expect(buildAreaFilter("West")(event)).toBe(true);
    expect(buildAreaFilter("East")(event)).toBe(false);
  });

  it("checks for Central", () => {
    const event = buildEvent({
      location: {
        lon: -0.12488365173339844,
        lat: 51.49949975595735
      }
    });
    expect(buildAreaFilter("Central")(event)).toBe(true);
    expect(buildAreaFilter("North")(event)).toBe(false);
  });
});
