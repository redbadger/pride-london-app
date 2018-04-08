// @flow
import {
  buildDateRangeFilter,
  buildTimeFilter,
  buildCategoryFilter
} from "./basic-event-filters";
import {
  selectDateFilter,
  selectTimeFilter,
  buildEventFilter,
  selectIsStagingFilters
} from "./event-filters";
import type { FilterCollection } from "../data/event-filters";
import type { Event } from "../data/event";

jest.mock("./basic-event-filters");
const untypedBuildDateRangeFilter: any = buildDateRangeFilter;
const untypedBuildTimeFilter: any = buildTimeFilter;
const untypedBuildCategoryFilter: any = buildCategoryFilter;

const buildState = (
  selectedFilters: FilterCollection,
  stagedFilters: FilterCollection
) => ({
  events: {
    entries: [],
    assets: [],
    loading: false,
    refreshing: false
  },
  eventFilters: {
    selectedFilters,
    stagedFilters
  }
});

export type BuildEventArguments = {
  startTime: string,
  endTime: string,
  categories?: Array<string>
};

const buildEvent = ({
  startTime,
  endTime,
  categories = []
}: BuildEventArguments) =>
  (({
    fields: {
      startTime: { "en-GB": startTime },
      endTime: { "en-GB": endTime },
      categories: { "en-GB": categories }
    }
  }: any): Event);

describe("selectDateFilter", () => {
  it("returns the date part of the eventFilters", () => {
    const state = buildState(
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        time: new Set(["morning"])
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-02", endDate: "2018-01-02" },
        time: new Set(["morning"])
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
        time: new Set(["morning"])
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-02", endDate: "2018-01-02" },
        time: new Set(["morning"])
      }
    );

    const actual = selectDateFilter(state, true);
    expect(actual).toEqual({ startDate: "2018-01-02", endDate: "2018-01-02" });
  });
});

describe("selectTimeFilter", () => {
  it("returns the time part of the eventFilters", () => {
    const time = new Set(["morning"]);
    const state = buildState(
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        time
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        time: new Set(["afternoon"])
      }
    );

    const actual = selectTimeFilter(state);
    expect(actual).toBe(time);
  });

  it("returns the time part of the staged eventFilters", () => {
    const time = new Set(["afternoon"]);
    const state = buildState(
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        time: new Set(["morning"])
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        time
      }
    );

    const actual = selectTimeFilter(state, true);
    expect(actual).toBe(time);
  });
});

describe("selectIsStagingFilters", () => {
  it("return falsee if staging filters are the same instance as selected filters", () => {
    const filters = {
      categories: new Set(),
      date: { startDate: "2018-01-01", endDate: "2018-01-01" },
      time: new Set(["morning"])
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
        time: new Set(["morning"])
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        time: new Set(["morning"])
      }
    );

    const actual = selectIsStagingFilters(state);
    expect(actual).toBe(true);
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
        time: new Set(["morning", "afternoon", "evening"])
      },
      {
        categories: new Set(),
        date: null,
        time: new Set(["morning", "afternoon", "evening"])
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
        time: new Set(["morning", "afternoon", "evening"])
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-02", endDate: "2018-01-02" },
        time: new Set(["morning", "afternoon", "evening"])
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
        time: new Set(["morning", "afternoon", "evening"])
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-03", endDate: "2018-01-03" },
        time: new Set(["morning", "afternoon", "evening"])
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
        time: new Set(["morning", "afternoon", "evening"])
      },
      {
        categories: new Set(),
        date: {
          startDate: "2018-08-02",
          endDate: "2018-08-03"
        },
        time: new Set(["morning", "afternoon", "evening"])
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
        time: new Set()
      },
      {
        categories: new Set(),
        date: null,
        time: new Set()
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
        time: new Set(["morning", "afternoon", "evening"])
      },
      {
        categories: new Set(),
        date: null,
        time: new Set(["morning", "afternoon", "evening"])
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
        time: new Set(["morning", "evening"])
      },
      {
        categories: new Set(),
        date: null,
        time: new Set(["morning", "evening"])
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
        time: new Set(["morning"])
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        time: new Set(["morning"])
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
        time: new Set(["morning", "afternoon", "evening"])
      },
      {
        categories: new Set(),
        date: { startDate: "2018-01-01", endDate: "2018-01-01" },
        time: new Set(["morning", "afternoon", "evening"])
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
        time: new Set(),
        categories: new Set(["Community"])
      },
      {
        date: null,
        time: new Set(),
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
        time: new Set(),
        categories: new Set(["Community"])
      },
      {
        date: null,
        time: new Set(),
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
        time: new Set(),
        categories: new Set(["Community"])
      },
      {
        date: null,
        time: new Set(),
        categories: new Set(["Community"])
      }
    );
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
  });
});

afterEach(() => {
  untypedBuildDateRangeFilter.mockReset();
  untypedBuildCategoryFilter.mockReset();
});
