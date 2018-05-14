import { toFormat, isBefore, addDays, parse } from "./date";

describe("toFormat", () => {
  it("formats a date", () => {
    expect(toFormat("2018-07-07T04:00+01:00")).toMatchSnapshot();
  });
  it("formats a date with a given format string", () => {
    expect(toFormat("2018-07-07T04:00+01:00", "YYYY-MM-DD")).toMatchSnapshot();
  });
});

describe("isBefore", () => {
  it("returns true when first date is before second", () => {
    expect(isBefore("2018-07-07T04:00+01:00", "2018-07-08T04:00+01:00")).toBe(
      true
    );
  });

  it("returns false when first date is not before second", () => {
    expect(isBefore("2018-07-07T04:00+01:00", "2018-07-06T04:00+01:00")).toBe(
      false
    );
  });
});

describe("addDays", () => {
  it("adds days to a given date", () => {
    expect(addDays("2018-07-07T04:00+01:00", 2)).toEqual(
      new Date("2018-07-09T04:00+01:00")
    );
  });
});

describe("parse", () => {
  it("parses an ISO date", () => {
    expect(parse("2018-07-07T04:00+01:00")).toEqual(
      new Date("2018-07-07T04:00+01:00")
    );
  });
});
