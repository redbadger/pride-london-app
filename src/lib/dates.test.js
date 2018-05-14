import {
  toFormat,
  isBefore,
  addDays,
  parse,
  compareAsc,
  areRangesOverlapping,
  startOfDay,
  endOfDay,
  getHours,
  differenceInCalendarDays
} from "./date";

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
      "2018-07-09T04:00+01:00"
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

describe("compareAsc", () => {
  it("returns -1 when first date is before the second date", () => {
    expect(compareAsc("2018-07-07T04:00+01:00", "2018-07-08T04:00+01:00")).toBe(
      -1
    );
  });

  it("returns 0 when both dates are the same", () => {
    expect(compareAsc("2018-07-07T04:00+01:00", "2018-07-07T04:00+01:00")).toBe(
      0
    );
  });

  it("returns 1 when first date is after the second date", () => {
    expect(compareAsc("2018-07-07T04:00+01:00", "2018-07-06T04:00+01:00")).toBe(
      1
    );
  });
});

describe("areRangesOverlapping", () => {
  it("returns true when ranges overlap", () => {
    expect(
      areRangesOverlapping(
        "2018-07-07T04:00+01:00",
        "2018-07-10T04:00+01:00",
        "2018-07-08T04:00+01:00",
        "2018-07-11T04:00+01:00"
      )
    ).toBe(true);
  });

  it("returns false when ranges do not overlap", () => {
    expect(
      areRangesOverlapping(
        "2018-07-07T04:00+01:00",
        "2018-07-10T04:00+01:00",
        "2018-07-11T04:00+01:00",
        "2018-07-14T04:00+01:00"
      )
    ).toBe(false);
  });
});

describe("startOfDay", () => {
  it("returns the start of a given day", () => {
    expect(startOfDay("2018-07-07T04:00+01:00")).toEqual(
      "2018-07-07T00:00+01:00"
    );
  });
});

describe("endOfDay", () => {
  it("returns the end of a given day", () => {
    expect(endOfDay("2018-07-07T04:00+01:00")).toEqual(
      "2018-07-07T23:59:59.999+01:00"
    );
  });
});

describe("getHours", () => {
  it("returns the hours into a given day", () => {
    expect(getHours("2018-07-07T04:00+01:00")).toBe(4);
  });
});

describe("differenceInCalendarDays", () => {
  it("returns the calendar days between two dates", () => {
    expect(
      differenceInCalendarDays(
        "2018-07-09T04:00+01:00",
        "2018-07-07T04:00+01:00"
      )
    ).toBe(2);
  });

  it("returns a negative value if dates are ascending", () => {
    expect(
      differenceInCalendarDays(
        "2018-07-07T04:00+01:00",
        "2018-07-09T04:00+01:00"
      )
    ).toBe(-2);
  });

  it("returns 0 for different hours of the same day", () => {
    expect(
      differenceInCalendarDays("2018-08-01T10:00:00", "2018-08-01T00:00:00")
    ).toBe(0);
  });

  it("returns integer for hours spanning a day boundary", () => {
    expect(
      differenceInCalendarDays("2018-08-03T03:00:00", "2018-08-04T00:00:00")
    ).toBe(-1);
  });
});
