// @flow
import { formatDateRange } from "./formatters";

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
