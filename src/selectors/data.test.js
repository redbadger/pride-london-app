// @flow
import {
  generateEvent,
  generatePerformance,
  sampleArrayOf,
  sampleOne
} from "../data/__test-data";
import type { State as DataState } from "../reducers/data";
import {
  selectEvents,
  selectEventsMap,
  selectEventById,
  selectLoading,
  selectPerformanceById,
  selectPerformancesMap,
  selectRefreshing
} from "./data";

const createData = (): DataState => ({
  entries: [],
  events: [],
  headerBanners: [],
  images: {},
  performances: {},
  sponsors: [],
  loading: false,
  refreshing: false
});

describe("selectLoading", () => {
  it("selects events", () => {
    const data = createData();
    data.loading = true;
    const selected = selectLoading(data);

    expect(selected).toEqual(true);
  });
});

describe("selectRefreshing", () => {
  it("selects events", () => {
    const data = createData();
    data.refreshing = true;
    const selected = selectRefreshing(data);

    expect(selected).toEqual(true);
  });
});

describe("selectEvents", () => {
  it("selects events", () => {
    const data = createData();
    const selected = selectEvents(data);

    expect(selected).toEqual(data.events);
  });
});

describe("selectEventsMap", () => {
  it("transforms array of events to map of events", () => {
    const selected = selectEventsMap(sampleArrayOf(generateEvent)(3));

    expect(selected).toMatchSnapshot();
  });
});

describe("selectEventById", () => {
  it("selects event property", () => {
    const event = sampleOne(generateEvent, { seed: 398 });
    const eventsById = {
      test: event
    };
    const selected = selectEventById(eventsById, "test");

    expect(selected).toEqual(event);
  });
});

describe("selectPerformancesMap", () => {
  it("selects performances", () => {
    const data = createData();
    const selected = selectPerformancesMap(data);

    expect(selected).toEqual(data.performances);
  });
});

describe("selectPerformanceById", () => {
  it("selects performance", () => {
    const performance = sampleOne(generatePerformance, { seed: 398 });
    const performancesById = {
      test: performance
    };
    const selected = selectPerformanceById(performancesById, "test");

    expect(selected).toEqual(performance);
  });
});
