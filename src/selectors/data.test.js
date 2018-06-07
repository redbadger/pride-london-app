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
  selectPerformancesMap,
  selectPerformanceById
} from "./data";

const defaultData: DataState = {
  entries: [],
  events: [],
  headerBanners: [],
  images: {},
  performances: {},
  sponsors: [],
  loading: false,
  refreshing: false
};

describe("selectEvents", () => {
  it("selects events", () => {
    const selected = selectEvents(defaultData);

    expect(selected).toEqual(defaultData.events);
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
    const selected = selectPerformancesMap(defaultData);

    expect(selected).toEqual(defaultData.performances);
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
