// @flow
import React from "react";
import { CalendarList } from "react-native-calendars";
import { shallow } from "enzyme";
import DateRangePicker from "./DateRangePicker";

describe("renders correctly", () => {
  it("no dates", () => {
    const output = shallow(
      <DateRangePicker
        onChange={() => {}}
        forceNewRange={false}
        today={new Date("2018-04-14")}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("only startDate", () => {
    const output = shallow(
      <DateRangePicker
        onChange={() => {}}
        dateRange={{ startDate: "2018-01-01", endDate: "2018-01-01" }}
        forceNewRange={false}
        today={new Date("2018-04-14")}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("startDate before endDate", () => {
    const output = shallow(
      <DateRangePicker
        onChange={() => {}}
        dateRange={{ startDate: "2018-01-01", endDate: "2018-01-02" }}
        forceNewRange={false}
        today={new Date("2018-04-14")}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("startDate after endDate", () => {
    const output = shallow(
      <DateRangePicker
        onChange={() => {}}
        dateRange={{ startDate: "2018-01-02", endDate: "2018-01-01" }}
        forceNewRange={false}
        today={new Date("2018-04-14")}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("startDate equals endDate", () => {
    const output = shallow(
      <DateRangePicker
        onChange={() => {}}
        dateRange={{ startDate: "2018-01-01", endDate: "2018-01-01" }}
        forceNewRange={false}
        today={new Date("2018-04-14")}
      />
    );
    expect(output).toMatchSnapshot();
  });
});

describe("pastScrollRange", () => {
  it("shows today if nothing selected", () => {
    const output = shallow(
      <DateRangePicker
        onChange={() => {}}
        dateRange={undefined}
        forceNewRange
        today={new Date("2018-04-14")}
      />
    );

    expect(output.prop("current")).toBe(null);
    expect(output.prop("pastScrollRange")).toBe(0);
  });

  it("shows today when selection starts in current month", () => {
    const output = shallow(
      <DateRangePicker
        onChange={() => {}}
        dateRange={{ startDate: "2018-04-20", endDate: "2018-04-22" }}
        forceNewRange
        today={new Date("2018-04-14")}
      />
    );

    expect(output.prop("current")).toBe("2018-04-20");
    expect(output.prop("pastScrollRange")).toBe(0);
  });

  it("shows selected month and enables scoll back to today", () => {
    const output = shallow(
      <DateRangePicker
        onChange={() => {}}
        dateRange={{ startDate: "2018-05-20", endDate: "2018-05-22" }}
        forceNewRange
        today={new Date("2018-04-14")}
      />
    );

    expect(output.prop("current")).toBe("2018-05-20");
    expect(output.prop("pastScrollRange")).toBe(1);
  });
});

describe("onChange", () => {
  const render = (onChange, dateRange) => {
    const output = shallow(
      <DateRangePicker
        onChange={onChange}
        dateRange={dateRange}
        forceNewRange={false}
      />
    );
    return output.find(CalendarList).prop("onDayPress");
  };
  const getCalendarDay = dateString => ({
    year: 0,
    month: 0,
    day: 0,
    timestamp: 0,
    dateString
  });

  it("reports single date when first day is selected", () => {
    const onChange = jest.fn();
    const onDayPress = render(onChange, null);
    onDayPress(getCalendarDay("2018-01-01"));
    expect(onChange).toHaveBeenCalledWith({
      startDate: "2018-01-01",
      endDate: "2018-01-01"
    });
  });

  it("reports date range when second day is selected", () => {
    const onChange = jest.fn();
    const onDayPress = render(onChange, {
      startDate: "2018-11-22",
      endDate: "2018-11-22"
    });
    onDayPress(getCalendarDay("2018-11-25"));
    expect(onChange).toHaveBeenCalledWith({
      startDate: "2018-11-22",
      endDate: "2018-11-25"
    });
  });

  it("reports sorted date range when second day is selected", () => {
    const onChange = jest.fn();
    const onDayPress = render(onChange, {
      startDate: "2018-11-22",
      endDate: "2018-11-22"
    });
    onDayPress(getCalendarDay("2018-11-05"));
    expect(onChange).toHaveBeenCalledWith({
      startDate: "2018-11-05",
      endDate: "2018-11-22"
    });
  });

  it("reports date range when second day is changed", () => {
    const onChange = jest.fn();
    const onDayPress = render(onChange, {
      startDate: "2018-11-22",
      endDate: "2018-11-25"
    });
    onDayPress(getCalendarDay("2018-11-28"));
    expect(onChange).toHaveBeenCalledWith({
      startDate: "2018-11-28",
      endDate: "2018-11-28"
    });
  });
});
