// @flow
import { selectEventIsFree } from "./event";
import type { Event } from "../data/event-deprecated";

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
