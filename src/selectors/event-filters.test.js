// @flow
import {
  buildDateFilter,
  buildDateRangeFilter,
  buildTimeFilter
} from "./basic-event-filters";
import {
  selectDateFilter,
  selectTimeFilter,
  buildEventFilter
} from "./event-filters";
import type { Event } from "../data/event";

jest.mock("./basic-event-filters");
const untypedBuildDateFilter: any = buildDateFilter;
const untypedBuildDateRangeFilter: any = buildDateRangeFilter;
const untypedBuildTimeFilter: any = buildTimeFilter;

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

const buildEvent = (startTime: string, endTime: string) =>
  (({
    fields: {
      startTime: { "en-GB": startTime },
      endTime: { "en-GB": endTime }
    }
  }: any): Event);

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

describe("buildEventFilter", () => {
  const event = buildEvent("2018-08-02T08:00:00", "2018-08-02T15:00:00");

  it("builds always truthy date filter when date is null", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);

    const state = buildState({
      date: null,
      time: ["morning", "afternoon", "evening"]
    });
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildDateFilter).not.toHaveBeenCalled();
    expect(untypedBuildDateRangeFilter).not.toHaveBeenCalled();
  });

  it("builds date filter when date is a string", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildDateFilter.mockReturnValue(() => true);

    const state = buildState({
      date: "2018-08-02",
      time: ["morning", "afternoon", "evening"]
    });
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildDateFilter).toHaveBeenCalledWith(
      state.eventFilters.date
    );
    expect(untypedBuildDateRangeFilter).not.toHaveBeenCalled();
  });

  it("builds date range filter when date is a range", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildDateRangeFilter.mockReturnValue(() => true);

    const state = buildState({
      date: {
        startDate: "2018-08-02",
        endDate: "2018-08-03"
      },
      time: ["morning", "afternoon", "evening"]
    });
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildDateFilter).not.toHaveBeenCalled();
    expect(untypedBuildDateRangeFilter).toHaveBeenCalledWith(
      state.eventFilters.date
    );
  });

  it("builds time filter", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);

    const state = buildState({
      date: null,
      time: ["morning", "afternoon", "evening"]
    });
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(true);
    expect(untypedBuildTimeFilter).toHaveBeenCalledWith(
      state.eventFilters.time
    );
  });

  it("builds filter, which returns false time filter return false", () => {
    untypedBuildTimeFilter.mockReturnValue(() => false);
    untypedBuildDateFilter.mockReturnValue(() => true);

    const state = buildState({
      date: "2018-02-01",
      time: ["morning", "afternoon", "evening"]
    });
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });

  it("builds filter, which returns false date filter return false", () => {
    untypedBuildTimeFilter.mockReturnValue(() => true);
    untypedBuildDateFilter.mockReturnValue(() => false);

    const state = buildState({
      date: "2018-02-01",
      time: ["morning", "afternoon", "evening"]
    });
    const filter = buildEventFilter(state);
    expect(filter(event)).toBe(false);
  });
});

afterEach(() => {
  untypedBuildDateFilter.mockReset();
  untypedBuildDateRangeFilter.mockReset();
  untypedBuildTimeFilter.mockReset();
});
