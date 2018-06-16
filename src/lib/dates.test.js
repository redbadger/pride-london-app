import {
  toFormat,
  toLondonFormat,
  isBefore,
  addDays,
  compareAsc,
  areRangesOverlapping,
  startOfDay,
  endOfDay,
  getHours,
  set,
  diff,
  add,
  now,
  FORMAT_CONTENTFUL_ISO,
  FORMAT_WEEKDAY_MONTH_DAY
} from "./date";

describe("toFormat", () => {
  it("formats a date with a given format string", () => {
    expect(
      toFormat("2018-07-07T04:00+01:00", FORMAT_WEEKDAY_MONTH_DAY)
    ).toEqual("Saturday, July 7");
  });

  it("preserves timezone", () => {
    expect(toFormat("2018-07-07T04:00+14:00", FORMAT_CONTENTFUL_ISO)).toEqual(
      "2018-07-07T04:00+14:00"
    );
  });
});

describe("toLondonFormat", () => {
  it("formats a date with a given format string", () => {
    expect(
      toLondonFormat("2018-07-07T04:00+01:00", FORMAT_WEEKDAY_MONTH_DAY)
    ).toEqual("Saturday, July 7");
  });

  it("converts to +01:00 timezone", () => {
    expect(
      toLondonFormat("2018-07-07T04:00+14:00", FORMAT_CONTENTFUL_ISO)
    ).toEqual("2018-07-06T15:00+01:00");
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

describe("set", () => {
  it("sets specified values on to date string", () => {
    const date = "2018-07-07T04:00+01:00";
    const values = {
      year: "2019",
      month: "08",
      day: "09"
    };
    expect(set(date, values)).toEqual("2019-08-09T04:00+01:00");
  });
});

describe("diff", () => {
  it("returns an object describing the diff between two dates", () => {
    expect(diff("2018-07-07T04:00+01:00", "2018-08-09T04:00+01:00")).toEqual({
      milliseconds: -2851200000
    });
  });
});

describe("add", () => {
  it("adds the specified values on to a date string", () => {
    expect(add("2018-07-07T04:00+01:00", { days: 2, months: 1 })).toEqual(
      "2018-08-09T04:00+01:00"
    );
  });
});

describe("now", () => {
  it("returns current time as a string", () => {
    expect(now()).toEqual(expect.any(String));
  });
});
