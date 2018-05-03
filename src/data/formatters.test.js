// @flow
import {
  formatDateRange,
  formatTime,
  formatPrice,
  formattedEventPrice,
  formattedEventPriceRange
} from "./formatters";

describe("formatDateRange", () => {
  it("formats date correctly", () => {
    const result = formatDateRange({
      startDate: "2018-01-01",
      endDate: "2018-01-01"
    });
    expect(result).toBe("1 Jan");
  });

  it("formats date range correctly", () => {
    const result = formatDateRange({
      startDate: "2018-01-01",
      endDate: "2018-01-02"
    });
    expect(result).toBe("1 Jan - 2 Jan");
  });
});

describe("formatTime", () => {
  it("formats time correctly", () => {
    const a = formatTime("2017-07-09T11:00+01:00");
    expect(a).toBe("11:00");
    const b = formatTime("2017-07-09T06:00+01:00");
    expect(b).toBe("06:00");
  });
});

describe("formatPrice", () => {
  it("formats the price to rounded number when there are no decimals", () => {
    const result = formatPrice(12);
    expect(result).toBe("12");
  });
  it("formats the price with decimals to 2 decimal places", () => {
    const result = formatPrice(11.3);
    expect(result).toBe("11.30");
  });
});

describe("formattedEventPrice", () => {
  it("returns Free as the price when isFree is true", () => {
    const result = formattedEventPrice(true, 0, 0);
    expect(result).toBe("Free");
  });
  it("returns the eventPriceLow when it equals the eventPriceHigh and isFree is false", () => {
    const result = formattedEventPrice(false, 4.55, 4.55);
    expect(result).toBe("£4.55");
  });
  it("returns From eventPriceLow when there is a range of prices", () => {
    const result = formattedEventPrice(false, 12, 15.5);
    expect(result).toBe("From £12");
  });
});

describe("formattedEventPriceRange", () => {
  it("returns free for free events", () => {
    expect(formattedEventPriceRange(true, 1, 2)).toEqual("Free");
  });

  it("returns the range of prices when a higher price is also given", () => {
    expect(formattedEventPriceRange(false, 1, 2)).toEqual("£1 - £2");
  });

  it("formats the prices with 2 decimals", () => {
    expect(formattedEventPriceRange(false, 1.12, 2.12)).toEqual(
      "£1.12 - £2.12"
    );
  });

  it("returns the low price if there is no higher price", () => {
    expect(formattedEventPriceRange(false, 1, 1)).toEqual("£1");
    expect(formattedEventPriceRange(false, 1)).toEqual("£1");
  });
});
