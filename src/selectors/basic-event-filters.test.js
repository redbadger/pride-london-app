// @flow
import { generateEvent, sampleOne } from "../data/__test-data";
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
}: BuildEventArguments): Event => {
  const event = sampleOne(generateEvent);
  event.fields.startTime = startTime;
  event.fields.endTime = endTime;
  event.fields.eventCategories = eventCategories;
  event.fields.eventPriceLow = eventPriceLow;
  event.fields.eventPriceHigh = eventPriceHigh;
  event.fields.location = location;
  return event;
};

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
  describe("events spanning a single time slot", () => {
    it("correctly filters an event that starts and ends in the same morning", () => {
      const morningEvent = buildEvent({
        startTime: "2018-08-02T06:00:00",
        endTime: "2018-08-02T11:59:00"
      });

      const morningFilter = buildTimeFilter("morning");
      const afternoonFilter = buildTimeFilter("afternoon");
      const eveningFilter = buildTimeFilter("evening");
      expect(morningFilter(morningEvent)).toBe(true);
      expect(afternoonFilter(morningEvent)).toBe(false);
      expect(eveningFilter(morningEvent)).toBe(false);
    });

    it("correctly filters an event that starts and ends in the same afternoon", () => {
      const afternoonEvent = buildEvent({
        startTime: "2018-08-02T12:00:00",
        endTime: "2018-08-02T17:59:00"
      });
      const morningFilter = buildTimeFilter("morning");
      const afternoonFilter = buildTimeFilter("afternoon");
      const eveningFilter = buildTimeFilter("evening");
      expect(morningFilter(afternoonEvent)).toBe(false);
      expect(afternoonFilter(afternoonEvent)).toBe(true);
      expect(eveningFilter(afternoonEvent)).toBe(false);
    });

    it("correctly filters an event that starts and ends in the same evening", () => {
      const eveningEvent = buildEvent({
        startTime: "2018-08-02T18:00:00",
        endTime: "2018-08-03T05:59:00"
      });
      const morningFilter = buildTimeFilter("morning");
      const afternoonFilter = buildTimeFilter("afternoon");
      const eveningFilter = buildTimeFilter("evening");
      expect(morningFilter(eveningEvent)).toBe(false);
      expect(afternoonFilter(eveningEvent)).toBe(false);
      expect(eveningFilter(eveningEvent)).toBe(true);
    });
  });

  describe("events spanning multiple time slots", () => {
    it("correctly filters an event spanning morning to afternoon", () => {
      const morningToAfternoon = buildEvent({
        startTime: "2018-08-02T09:00:00",
        endTime: "2018-08-02T15:00:00"
      });

      const morningFilter = buildTimeFilter("morning");
      const afternoonFilter = buildTimeFilter("afternoon");
      const eveningFilter = buildTimeFilter("evening");
      expect(morningFilter(morningToAfternoon)).toBe(true);
      expect(afternoonFilter(morningToAfternoon)).toBe(true);
      expect(eveningFilter(morningToAfternoon)).toBe(false);
    });

    it("correctly filters an event spanning afternoon to evening", () => {
      const afternoonToEvening = buildEvent({
        startTime: "2018-08-02T14:00:00",
        endTime: "2018-08-02T20:00:00"
      });

      const morningFilter = buildTimeFilter("morning");
      const afternoonFilter = buildTimeFilter("afternoon");
      const eveningFilter = buildTimeFilter("evening");
      expect(morningFilter(afternoonToEvening)).toBe(false);
      expect(afternoonFilter(afternoonToEvening)).toBe(true);
      expect(eveningFilter(afternoonToEvening)).toBe(true);
    });

    it("correctly filters an event spanning morning to evening", () => {
      const morningToEvening = buildEvent({
        startTime: "2018-08-02T09:00:00",
        endTime: "2018-08-02T20:00:00"
      });

      const morningFilter = buildTimeFilter("morning");
      const afternoonFilter = buildTimeFilter("afternoon");
      const eveningFilter = buildTimeFilter("evening");
      expect(morningFilter(morningToEvening)).toBe(true);
      expect(afternoonFilter(morningToEvening)).toBe(true);
      expect(eveningFilter(morningToEvening)).toBe(true);
    });

    it("correctly filters an event spanning evening to morning", () => {
      const eveningToMorning = buildEvent({
        startTime: "2018-08-02T20:00:00",
        endTime: "2018-08-03T08:00:00"
      });

      const morningFilter = buildTimeFilter("morning");
      const afternoonFilter = buildTimeFilter("afternoon");
      const eveningFilter = buildTimeFilter("evening");
      expect(morningFilter(eveningToMorning)).toBe(true);
      expect(afternoonFilter(eveningToMorning)).toBe(false);
      expect(eveningFilter(eveningToMorning)).toBe(true);
    });

    it("correctly filters an event spanning afternoon to morning", () => {
      const afternoonToMorning = buildEvent({
        startTime: "2018-08-02T16:00:00",
        endTime: "2018-08-03T11:00:00"
      });

      const morningFilter = buildTimeFilter("morning");
      const afternoonFilter = buildTimeFilter("afternoon");
      const eveningFilter = buildTimeFilter("evening");
      expect(morningFilter(afternoonToMorning)).toBe(true);
      expect(afternoonFilter(afternoonToMorning)).toBe(true);
      expect(eveningFilter(afternoonToMorning)).toBe(true);
    });

    it("correctly filters an event spanning evening to afternoon", () => {
      const eveningToAfternoon = buildEvent({
        startTime: "2018-08-02T20:00:00",
        endTime: "2018-08-03T15:00:00"
      });

      const morningFilter = buildTimeFilter("morning");
      const afternoonFilter = buildTimeFilter("afternoon");
      const eveningFilter = buildTimeFilter("evening");
      expect(morningFilter(eveningToAfternoon)).toBe(true);
      expect(afternoonFilter(eveningToAfternoon)).toBe(true);
      expect(eveningFilter(eveningToAfternoon)).toBe(true);
    });

    it("correctly filters an event spanning morning to morning the following day", () => {
      const morningToMorning = buildEvent({
        startTime: "2018-08-02T09:00:00",
        endTime: "2018-08-03T10:00:00"
      });

      const morningFilter = buildTimeFilter("morning");
      const afternoonFilter = buildTimeFilter("afternoon");
      const eveningFilter = buildTimeFilter("evening");
      expect(morningFilter(morningToMorning)).toBe(true);
      expect(afternoonFilter(morningToMorning)).toBe(true);
      expect(eveningFilter(morningToMorning)).toBe(true);
    });
  });
});

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
