// @flow
import { formatShortDate, formatDateRange } from "./formatters";

describe("formatShortDate", () => {
  it("formats correctly", () => {
    const result = formatShortDate("2018-01-01");
    expect(result).toBe("1 Jan");
  });
});

describe("formatDateRange", () => {
  it("formats date correctly", () => {
    const result = formatDateRange({
      startDate: "2018-01-01",
      endDate: "2018-01-01"
    });
    expect(result).toBe("1 Jan");
  });

  it("formats date with suffix correctly", () => {
    const result = formatDateRange(
      { startDate: "2018-01-01", endDate: "2018-01-01" },
      { dateSuffix: "@@@" }
    );
    expect(result).toBe("1 Jan@@@");
  });

  it("formats date range correctly", () => {
    const result = formatDateRange({
      startDate: "2018-01-01",
      endDate: "2018-01-02"
    });
    expect(result).toBe("1 Jan - 2 Jan");
  });
});
