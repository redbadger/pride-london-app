// @flow
import { eventIsSaved, selectEventIsFree } from "./event";
import type { Event } from "../data/event";

describe("selectEventIsFree", () => {
  it("returns true if both prices are 0", () => {
    const event = (({
      fields: {
        eventPriceLow: { "en-GB": 0 },
        eventPriceHigh: { "en-GB": 0 }
      }
    }: any): Event);

    expect(selectEventIsFree(event)).toBe(true);
  });

  it("returns false if any price is non 0", () => {
    const event = (({
      fields: {
        eventPriceLow: { "en-GB": 0 },
        eventPriceHigh: { "en-GB": 12 }
      }
    }: any): Event);

    expect(selectEventIsFree(event)).toBe(false);
  });
});

describe("eventIsSaved", () => {
  it("returns true if event id exists in savedEvents", () => {
    const id = "9df600f3-12d0-4611-a5e3-ace6219ad163";
    const event = (({
      sys: {
        id
      }
    }: any): Event);
    const savedEvents = new Set([id]);

    expect(eventIsSaved(savedEvents, event)).toBe(true);
  });

  it("returns false if event id does not exist in savedEvents", () => {
    const id = "179acbdf-61d1-4fae-b005-5f4a359a7c85";
    const event = (({
      sys: {
        id
      }
    }: any): Event);
    const savedEvents = new Set();

    expect(eventIsSaved(savedEvents, event)).toBe(false);
  });
});
