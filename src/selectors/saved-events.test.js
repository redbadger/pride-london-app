// @flow
import { sampleOne, generateEvent } from "../data/__test-data";
import { resolveSavedEvents } from "./saved-events";

describe("resolveSavedEvents", () => {
  it("returns an array with events resolved", () => {
    const eventA = sampleOne(generateEvent, { seed: 1234 });
    const eventB = sampleOne(generateEvent, { seed: 4255 });
    const events = {
      [eventA.id]: eventA,
      [eventB.id]: eventB
    };
    const savedEvents = new Set([eventA.id, eventB.id]);

    const selected = resolveSavedEvents(savedEvents, events);
    expect(selected).toEqual([eventA, eventB]);
  });

  it("omits any events that are missing", () => {
    const eventA = sampleOne(generateEvent, { seed: 1234 });
    const eventB = sampleOne(generateEvent, { seed: 4255 });
    const events = {
      [eventA.id]: eventA,
      [eventB.id]: eventB
    };
    const savedEvents = new Set([eventA.id, "missing"]);

    const selected = resolveSavedEvents(savedEvents, events);
    expect(selected).toEqual([eventA]);
  });
});
