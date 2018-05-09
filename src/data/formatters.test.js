// @flow
import {
  formatDateRange,
  formatTime,
  formatPrice,
  formatShortEventPrice,
  formatLongEventPrice,
  removeTimezoneFromCmsDateString
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
    const a = formatTime("2017-07-09T11:00");
    expect(a).toBe("11:00");
    const b = formatTime("2017-07-09T06:00");
    expect(b).toBe("06:00");
  });
});

describe("removeTimezoneFromCmsDateString", () => {
  it("formats dateString correctly", () => {
    const dateString = "2018-04-09T20:00+01:00";
    const expected = "2018-04-09T20:00";

    expect(removeTimezoneFromCmsDateString(dateString)).toEqual(expected);
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

describe("formatShortEventPrice", () => {
  it("returns Free as the price when both prices are zero", () => {
    const result = formatShortEventPrice(0, 0);
    expect(result).toBe("Free");
  });

  it("returns the eventPriceLow when it equals the eventPriceHigh", () => {
    const result = formatShortEventPrice(4.55, 4.55);
    expect(result).toBe("£4.55");
  });

  it("returns From eventPriceLow when there is a range of prices", () => {
    const result = formatShortEventPrice(12, 15.5);
    expect(result).toBe("From £12");
  });

  it("returns From eventPriceLow when there is a range of prices from £0", () => {
    const result = formatShortEventPrice(0, 15.5);
    expect(result).toBe("From £0");
  });

  it("returns eventPriceLow when the prices are the same, but not zero", () => {
    const result = formatShortEventPrice(15.5, 15.5);
    expect(result).toBe("£15.50");
  });
});

describe("formatLongEventPrice", () => {
  it("returns free for free events", () => {
    expect(formatLongEventPrice(0, 0)).toEqual("Free");
  });

  it("returns the range of prices when zero and a higher price are given", () => {
    expect(formatLongEventPrice(0, 2)).toEqual("£0 - £2");
  });

  it("returns the range of prices when a higher price is also given", () => {
    expect(formatLongEventPrice(1, 2)).toEqual("£1 - £2");
  });

  it("returns the low price if both prices are the same", () => {
    expect(formatLongEventPrice(2, 2)).toEqual("£2");
  });

  it("formats the prices with 2 decimals", () => {
    expect(formatLongEventPrice(1.12, 2.12)).toEqual("£1.12 - £2.12");
  });
});
