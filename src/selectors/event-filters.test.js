// @flow
import { DateTime } from "luxon";
import {
  buildDateRangeFilter,
  buildTimeFilter,
  buildPriceFilter,
  buildStringSetFilter,
  buildAreaFilter,
  buildCategoryFilter
} from "./basic-event-filters";
import {
  selectDateFilter,
  selectTimeFilter,
  buildEventFilter,
  selectIsStagingFilters,
  selectTagFilterSelectedCount
} from "./event-filters";
import type { FilterCollection } from "../data/event-filters";
import type { Event } from "../data/event";

jest.mock("./basic-event-filters");
const untypedBuildDateRangeFilter: any = buildDateRangeFilter;
const untypedBuildTimeFilter: any = buildTimeFilter;
const untypedBuildPriceFilter: any = buildPriceFilter;
const untypedBuildStringSetFilter: any = buildStringSetFilter;
const untypedBuildAreaFilter: any = buildAreaFilter;
const untypedBuildCategoryFilter: any = buildCategoryFilter;

const buildState = (
  selectedFilters: FilterCollection,
  stagedFilters: FilterCollection
) => ({
  data: {
    entries: [],
    assets: [],
    headerBanners: [],
    sponsors: [],
    loading: false,
    refreshing: false
  },
  eventFilters: {
    showEventsAfter: DateTime.fromISO("2018-07-07T00:00:00+01:00"),
    selectedFilters,
    stagedFilters
  },
  savedEvents: new Set(),
  currentRoute: "fakeRoute"
});

export type BuildEventArguments = {
  startTime: string,
  endTime: string,
  categories?: Array<string>,
  eventPriceLow?: number,
  eventPriceHigh?: number
};

const buildEvent = ({
  startTime,
  endTime,
  categories = [],
  eventPriceLow = 0,
  eventPriceHigh = 10
}: BuildEventArguments) =>
  (({
    fields: {
      startTime: { "en-GB": startTime },
      endTime: { "en-GB": endTime },
      categories: { "en-GB": categories },
      eventPriceLow: { "en-GB": eventPriceLow },
      eventPriceHigh: { "en-GB": eventPriceHigh }
    }
  }: any): Event);

describe("selectDateFilter", () => {
  it("returns the date part of the eventFilters", () => {
    const state = buildState(
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        timeOfDay: new Set(["morning"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-02", endDate: "2018-01-02" },
        timeOfDay: new Set(["morning"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );

    const actual = selectDateFilter(state);
    expect(actual).toEqual({ startDate: "2018-01-01", endDate: "2018-01-01" });
  });

  it("returns the date part of the staged eventFilters", () => {
    const state = buildState(
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        timeOfDay: new Set(["morning"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-02", endDate: "2018-01-02" },
        timeOfDay: new Set(["morning"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );

    const actual = selectDateFilter(state, true);
    expect(actual).toEqual({ startDate: "2018-01-02", endDate: "2018-01-02" });
  });
});

describe("selectTimeFilter", () => {
  it("returns the time part of the eventFilters", () => {
    const timeOfDay = new Set(["morning"]);
    const state = buildState(
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        timeOfDay,
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        timeOfDay: new Set(["afternoon"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );

    const actual = selectTimeFilter(state);
    expect(actual).toBe(timeOfDay);
  });

  it("returns the time part of the staged eventFilters", () => {
    const timeOfDay = new Set(["afternoon"]);
    const state = buildState(
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        timeOfDay: new Set(["morning"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        timeOfDay,
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );

    const actual = selectTimeFilter(state, true);
    expect(actual).toBe(timeOfDay);
  });
});

describe("selectIsStagingFilters", () => {
  it("return falsee if staging filters are the same instance as selected filters", () => {
    const filters = {
      categories: new Set(),
      date: { startDate: "2018-01-01", endDate: "2018-01-01" },
      timeOfDay: new Set(["morning"]),
      price: new Set(),
      audience: new Set(),
      venueDetails: new Set(),
      accessibilityOptions: new Set(),
      area: new Set()
    };
    const state = buildState(filters, filters);

    const actual = selectIsStagingFilters(state);
    expect(actual).toBe(false);
  });

  it("return true otherwise", () => {
    const state = buildState(
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        timeOfDay: new Set(["morning"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        timeOfDay: new Set(["morning"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );

    const actual = selectIsStagingFilters(state);
    expect(actual).toBe(true);
  });
});

describe("selectTagFilterSelectedCount", () => {
  it("returns number of selected tag filters", () => {
    const filters = {
      categories: new Set(),
      date: { startDate: "2018-01-01", endDate: "2018-01-01" },
      timeOfDay: new Set(["morning"]),
      price: new Set(["free"]),
      audience: new Set(),
      venueDetails: new Set(),
      accessibilityOptions: new Set(),
      area: new Set()
    };
    const state = buildState(filters, filters);

    const count = selectTagFilterSelectedCount(state);
    expect(count).toBe(2);
  });
});

describe("buildEventFilter", () => {
  const event = buildEvent({
    startTime: "2018-08-02T08:00:00",
    endTime: "2018-08-02T15:00:00"
  });

  it("builds always truthy date filter when date is null", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        categories: new Set(),
        date: null,
        timeOfDay: new Set(["morning", "afternoon", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: null,
        timeOfDay: new Set(["morning", "afternoon", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildDateRangeFilter).not.toHaveBeenCalled();
  });

  it("builds date filter when date is a string", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildDateRangeFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        categories: new Set(),
        date: { startDate: "2018-01-02", endDate: "2018-01-02" },
        timeOfDay: new Set(["morning", "afternoon", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-02", endDate: "2018-01-02" },
        timeOfDay: new Set(["morning", "afternoon", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildDateRangeFilter).toHaveBeenCalledWith(
      state.eventFilters.selectedFilters.date
    );
  });

  it("builds staged date filter when date is a string", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildDateRangeFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        categories: new Set(),
        date: { startDate: "2018-01-02", endDate: "2018-01-02" },
        timeOfDay: new Set(["morning", "afternoon", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-03", endDate: "2018-01-03" },
        timeOfDay: new Set(["morning", "afternoon", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state, true);
    expect(filter(event)).toBe(true);
    expect(untypedBuildDateRangeFilter).toHaveBeenCalledWith(
      state.eventFilters.stagedFilters.date
    );
  });

  it("builds date range filter when date is a range", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildDateRangeFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        categories: new Set(),
        date: {
          startDate: "2018-08-02",
          endDate: "2018-08-03"
        },
        timeOfDay: new Set(["morning", "afternoon", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: {
          startDate: "2018-08-02",
          endDate: "2018-08-03"
        },
        timeOfDay: new Set(["morning", "afternoon", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildDateRangeFilter).toHaveBeenCalledWith(
      state.eventFilters.selectedFilters.date
    );
  });

  it("builds always truthy time filter when time array is empty", () => {
    const state = buildState(
      {
        categories: new Set(),
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildTimeFilter).not.toHaveBeenCalled();
  });

  it("builds always truthy time filter when time array contains all possible values", () => {
    const state = buildState(
      {
        categories: new Set(),
        date: null,
        timeOfDay: new Set(["morning", "afternoon", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: null,
        timeOfDay: new Set(["morning", "afternoon", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildTimeFilter).not.toHaveBeenCalled();
  });

  it("builds time filter, which returns true when one of the times match", () => {
    untypedBuildTimeFilter
      .mockReturnValue(() => true)
      .mockReturnValueOnce(() => false);

    const state = buildState(
      {
        categories: new Set(),
        date: null,
        timeOfDay: new Set(["morning", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: null,
        timeOfDay: new Set(["morning", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildTimeFilter).toHaveBeenCalledWith("morning");
    expect(untypedBuildTimeFilter).toHaveBeenCalledWith("evening");
  });

  it("builds filter, which returns false when time filter return false", () => {
    untypedBuildTimeFilter.mockReturnValue(() => false);
    untypedBuildDateRangeFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        timeOfDay: new Set(["morning"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        timeOfDay: new Set(["morning"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds filter, which returns false when date filter return false", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildDateRangeFilter.mockReturnValue(() => false);

    const state = buildState(
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        timeOfDay: new Set(["morning", "afternoon", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        timeOfDay: new Set(["morning", "afternoon", "evening"]),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds truthy price filter when price is false", () => {
    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildPriceFilter).not.toHaveBeenCalled();
  });

  it("builds filter, which returns false when price filter returns false", () => {
    untypedBuildPriceFilter.mockReturnValue(() => false);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(["free"]),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(["free"]),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds filter, which returns true when price filter returns true", () => {
    untypedBuildPriceFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(["free"]),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(["free"]),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
  });

  it("builds truthy audience filter when no audience selected", () => {
    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildStringSetFilter).not.toHaveBeenCalled();
  });

  it("builds filter, which returns false when audience filter returns false", () => {
    untypedBuildStringSetFilter.mockReturnValue(() => false);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(["18+"]),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(["18+"]),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds filter, which returns true when audience filter returns true", () => {
    untypedBuildStringSetFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(["18+"]),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(["18+"]),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
  });

  it("builds truthy venue details filter when no venue details selected", () => {
    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildStringSetFilter).not.toHaveBeenCalled();
  });

  it("builds filter, which returns false when venue details filter returns false", () => {
    untypedBuildStringSetFilter.mockReturnValue(() => false);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(["Indoors"]),
        categories: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(["Indoors"]),
        categories: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds filter, which returns true when venue details filter returns true", () => {
    untypedBuildStringSetFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(["Indoors"]),
        categories: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(["Indoors"]),
        categories: new Set(),
        accessibilityOptions: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
  });

  it("builds truthy accessibility options filter when no accessibility options selected", () => {
    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildStringSetFilter).not.toHaveBeenCalled();
  });

  it("builds filter, which returns false when accessibility options filter returns false", () => {
    untypedBuildStringSetFilter.mockReturnValue(() => false);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        categories: new Set(),
        accessibilityOptions: new Set(["Step free access"]),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        categories: new Set(),
        accessibilityOptions: new Set(["Step free access"]),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds filter, which returns true when venue details filter returns true", () => {
    untypedBuildStringSetFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        categories: new Set(),
        accessibilityOptions: new Set(["Step free access"]),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        categories: new Set(),
        accessibilityOptions: new Set(["Step free access"]),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
  });

  it("builds truthy area filter when no areas selected", () => {
    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        categories: new Set(),
        area: new Set()
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildAreaFilter).not.toHaveBeenCalled();
  });

  it("builds filter, which returns false when area filter returns false", () => {
    untypedBuildAreaFilter.mockReturnValue(() => false);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        categories: new Set(),
        accessibilityOptions: new Set(),
        area: new Set(["North"])
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        categories: new Set(),
        accessibilityOptions: new Set(),
        area: new Set(["North"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds filter, which returns true when venue details filter returns true", () => {
    untypedBuildAreaFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        categories: new Set(),
        accessibilityOptions: new Set(),
        area: new Set(["North"])
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        categories: new Set(),
        accessibilityOptions: new Set(),
        area: new Set(["North"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
  });

  it("builds category filter, which returns false when category filter return false", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);

    untypedBuildCategoryFilter.mockReturnValue(() => false);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set(),
        categories: new Set(["Community"])
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set(),
        categories: new Set(["Community"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds category filter, which returns false when category filter return false", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildCategoryFilter.mockReturnValue(() => false);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set(),
        categories: new Set(["Community"])
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set(),
        categories: new Set(["Community"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds category filter, which returns true when category filter return true", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildCategoryFilter.mockReturnValue(() => true);

    const state = buildState(
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set(),
        categories: new Set(["Community"])
      },
      {
        date: null,
        timeOfDay: new Set(),
        price: new Set(),
        audience: new Set(),
        venueDetails: new Set(),
        accessibilityOptions: new Set(),
        area: new Set(),
        categories: new Set(["Community"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
  });
});

afterEach(() => {
  untypedBuildDateRangeFilter.mockReset();
  untypedBuildTimeFilter.mockReset();
  untypedBuildPriceFilter.mockReset();
  untypedBuildStringSetFilter.mockReset();
  untypedBuildAreaFilter.mockReset();
  untypedBuildCategoryFilter.mockReset();
});
