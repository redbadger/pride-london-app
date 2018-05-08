// @flow
import { selectEventIsFree } from "./event";
import type { Event } from "../data/event";

describe("selectEventIsFree", () => {
  it("returns true if flagged as 'free', even if there are prices set", () => {
    const event = (({
      fields: {
        isFree: {
          "en-GB": true
        },
        eventPriceLow: { "en-GB": 10 },
        eventPriceHigh: { "en-GB": 20 }
      }
    }: any): Event);

    expect(selectEventIsFree(event)).toBe(true);
  });

  it("returns false if not flagged as 'free'", () => {
    const event = (({
      fields: {
        isFree: {
          "en-GB": false
        },
        eventPriceLow: { "en-GB": 10 },
        eventPriceHigh: { "en-GB": 20 }
      }
    }: any): Event);

    expect(selectEventIsFree(event)).toBe(false);
  });

  it("returns true if both prices are 0, even if the 'free' flag is false", () => {
    const event = (({
      fields: {
        isFree: {
          "en-GB": false
        },
        eventPriceLow: { "en-GB": 0 },
        eventPriceHigh: { "en-GB": 0 }
      }
    }: any): Event);

    expect(selectEventIsFree(event)).toBe(true);
  });

  it("returns false if any price is non 0", () => {
    const event = (({
      fields: {
        isFree: {
          "en-GB": false
        },
        eventPriceLow: { "en-GB": 0 },
        eventPriceHigh: { "en-GB": 12 }
      }
    }: any): Event);

    expect(selectEventIsFree(event)).toBe(false);
  });
});
