// @flow
import {
  generateEvent,
  generateFeaturedEvents,
  generatePerformance,
  sampleArrayOf,
  sampleOne
} from "../data/__test-data";
import type { State as DataState } from "../reducers/data";
import {
  selectEvents,
  selectEventsMap,
  selectEventById,
  selectFeaturedEvents,
  selectFeaturedEventsByTitle,
  selectLoading,
  selectPerformanceById,
  selectPerformancesMap,
  selectRefreshing,
  resolveEvents
} from "./data";

const createData = (): DataState => ({
  events: [],
  featuredEvents: [],
  headerBanners: [],
  images: {},
  paradeGroups: [],
  performances: {},
  sponsors: [],
  amenities: [],
  loading: false,
  refreshing: false,
  noDataReceived: false
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

describe("selectFeaturedEvents", () => {
  it("selectsFeaturedEvents", () => {
    const data = createData();
    const selected = selectFeaturedEvents(data);

    expect(selected).toEqual(data.featuredEvents);
  });
});

describe("selectFeaturedEventsByTitle", () => {
  it("returns nothing when no featured events with the specified title exist", () => {
    const featuredEventsList = sampleArrayOf(generateFeaturedEvents)(3);
    const events = selectFeaturedEventsByTitle(featuredEventsList, "missing");
    expect(events).toEqual(undefined);
  });

  it("returns FeaturedEvents with the title", () => {
    const featuredEventsList = sampleArrayOf(generateFeaturedEvents)(3);
    const events = selectFeaturedEventsByTitle(
      featuredEventsList,
      featuredEventsList[1].fields.title
    );
    expect(events).toEqual(featuredEventsList[1]);
  });
});

describe("resolveEvents", () => {
  it("resolves array of FieldRefs to Events", () => {
    const eventA = sampleOne(generateEvent, { seed: 1236 });
    const eventB = sampleOne(generateEvent, { seed: 2236 });
    const eventC = sampleOne(generateEvent, { seed: 4236 });
    const eventMap = {
      [eventA.id]: eventA,
      [eventB.id]: eventB,
      [eventC.id]: eventC
    };
    const references = [{ sys: { id: eventA.id } }, { sys: { id: eventB.id } }];
    const resolved = resolveEvents(eventMap, references);
    expect(resolved).toEqual([eventA, eventB]);
  });

  it("omits any unresolvable FieldRefs", () => {
    const eventA = sampleOne(generateEvent, { seed: 1236 });
    const eventB = sampleOne(generateEvent, { seed: 2236 });
    const eventC = sampleOne(generateEvent, { seed: 4236 });
    const eventMap = {
      [eventA.id]: eventA,
      [eventB.id]: eventB,
      [eventC.id]: eventC
    };
    const references = [{ sys: { id: "missing" } }];
    const resolved = resolveEvents(eventMap, references);
    expect(resolved).toEqual([]);
  });
});
