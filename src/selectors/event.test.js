// @flow
import { generateEvent, sampleArrayOf, sampleOne } from "../data/__test-data";
import {
  filterEvents,
  groupEventsByStartTime,
  selectEventIsFree,
  getStages
} from "./event";

describe("selectEventIsFree", () => {
  it("returns true if both prices are 0", () => {
    const event = sampleOne(generateEvent);
    event.fields.eventPriceLow = 0;
    event.fields.eventPriceHigh = 0;

    expect(selectEventIsFree(event)).toBe(true);
  });

  it("returns false if any price is non 0", () => {
    const event = sampleOne(generateEvent);
    event.fields.eventPriceLow = 0;
    event.fields.eventPriceHigh = 12;

    expect(selectEventIsFree(event)).toBe(false);
  });
});

describe("groupEventsByStartTime", () => {
  it("returns empty array when no events exist", () => {
    const expected = [];
    const actual = groupEventsByStartTime([]);

    expect(actual).toEqual(expected);
  });

  it("separates two individual events by day and sorts", () => {
    const eventA = sampleOne(generateEvent, { seed: 1234 });
    eventA.fields.startTime = "2018-08-02T00:00:00";
    const eventB = sampleOne(generateEvent, { seed: 1421 });
    eventB.fields.startTime = "2018-08-01T00:00:00";

    const events = [eventA, eventB];

    const expected = [[eventB], [eventA]];
    const actual = groupEventsByStartTime(events);

    expect(actual).toEqual(expected);
  });

  it("leaves two events on the same day together", () => {
    const eventA = sampleOne(generateEvent, { seed: 1234 });
    eventA.fields.startTime = "2018-08-01T00:00:00";
    const eventB = sampleOne(generateEvent, { seed: 1421 });
    eventB.fields.startTime = "2018-08-01T10:00:00";

    const events = [eventA, eventB];

    const expected = [[eventA, eventB]];
    const actual = groupEventsByStartTime(events);

    expect(actual).toEqual(expected);
  });

  it("makes two groups", () => {
    const eventA = sampleOne(generateEvent, { seed: 1234 });
    eventA.fields.startTime = "2018-08-01T02:00:00";
    const eventB = sampleOne(generateEvent, { seed: 1421 });
    eventB.fields.startTime = "2018-08-02T02:00:00";
    const eventC = sampleOne(generateEvent, { seed: 2452 });
    eventC.fields.startTime = "2018-08-01T00:00:00";
    const eventD = sampleOne(generateEvent, { seed: 3244 });
    eventD.fields.startTime = "2018-08-02T03:00:00";
    const eventE = sampleOne(generateEvent, { seed: 2344 });
    eventE.fields.startTime = "2018-08-01T02:00:00";

    const events = [eventA, eventB, eventC, eventD, eventE];

    const expected = [[eventC, eventA, eventE], [eventB, eventD]];
    const actual = groupEventsByStartTime(events);

    expect(actual).toEqual(expected);
  });

  it("makes multiple groups", () => {
    const eventA = sampleOne(generateEvent, { seed: 1234 });
    eventA.fields.startTime = "2018-08-01T02:00:00";
    const eventB = sampleOne(generateEvent, { seed: 1421 });
    eventB.fields.startTime = "2018-08-02T02:00:00";
    const eventC = sampleOne(generateEvent, { seed: 2452 });
    eventC.fields.startTime = "2018-08-05T00:00:00";
    const eventD = sampleOne(generateEvent, { seed: 3244 });
    eventD.fields.startTime = "2018-08-04T03:00:00";
    const eventE = sampleOne(generateEvent, { seed: 2344 });
    eventE.fields.startTime = "2018-08-03T02:00:00";

    const events = [eventA, eventB, eventC, eventD, eventE];

    const expected = [[eventA], [eventB], [eventE], [eventD], [eventC]];
    const actual = groupEventsByStartTime(events);

    expect(actual).toEqual(expected);
  });
});

describe("filterEvents", () => {
  it("applies the passed filter to the passed events", () => {
    const events = sampleArrayOf(generateEvent)(5);
    const filter = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValue(true);
    const actual = filterEvents(events, filter);

    expect(actual.length).toEqual(3);
  });
});

describe("getStages", () => {
  it("returns empty array when no events exist", () => {
    const expected = [];
    const actual = getStages([]);

    expect(actual).toEqual(expected);
  });

  it("returns only events which are stages", () => {
    const eventA = sampleOne(generateEvent, { seed: 1234 });
    eventA.fields.stage = true;
    const eventB = sampleOne(generateEvent, { seed: 1421 });
    eventB.fields.stage = false;
    const eventC = sampleOne(generateEvent, { seed: 2452 });
    eventC.fields.stage = false;
    const eventD = sampleOne(generateEvent, { seed: 3244 });
    eventD.fields.stage = true;
    const eventE = sampleOne(generateEvent, { seed: 2344 });
    eventE.fields.stage = false;

    const events = [eventA, eventB, eventC, eventD, eventE];

    const expected = [eventA, eventD];
    const actual = getStages(events);
    expect(actual).toEqual(expected);
  });
});
