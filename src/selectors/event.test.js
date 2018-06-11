// @flow
import { generateEvent, sampleOne } from "../data/__test-data";
import { selectEventIsFree } from "./event";

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
