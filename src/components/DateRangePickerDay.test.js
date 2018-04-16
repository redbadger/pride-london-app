// @flow
import React from "react";
import { shallow } from "enzyme";
import DateRangePickerDay from "./DateRangePickerDay";

const render = props =>
  shallow(
    <DateRangePickerDay onPress={() => {}} onLongPress={() => {}} {...props} />
  );

const date = (year, month, day) => {
  const d = new Date(Date.UTC(year, month, day));
  return {
    year,
    month,
    day,
    timestamp: d.getTime(),
    dateString: d.toISOString()
  };
};

describe("DarteRangePickerDay", () => {
  it("renders without date selection", () => {
    const output = render({ date: date(2018, 7, 12), marking: {} });

    expect(output).toMatchSnapshot();
  });

  it("renders with a single selected day", () => {
    const marking = { selected: true, startingDay: true, endingDay: true };
    const output = render({ date: date(2018, 7, 12), marking });

    expect(output).toMatchSnapshot();
  });

  it("renders a beginning of a range", () => {
    const marking = { selected: true, startingDay: true };
    const output = render({ date: date(2018, 7, 12), marking });

    expect(output).toMatchSnapshot();
  });

  it("renders a beginning of a range", () => {
    const marking = { selected: true, endingDay: true };
    const output = render({ date: date(2018, 7, 12), marking });

    expect(output).toMatchSnapshot();
  });

  it("renders a middle of a range", () => {
    const marking = { selected: true };
    const output = render({ date: date(2018, 7, 12), marking });

    expect(output).toMatchSnapshot();
  });

  it("renders a marked day", () => {
    const marking = { marked: true };
    const output = render({ date: date(2018, 7, 12), marking });

    expect(output).toMatchSnapshot();
  });

  it("renders a marked, selected day", () => {
    const marking = { marked: true, selected: true };
    const output = render({ date: date(2018, 7, 12), marking });

    expect(output).toMatchSnapshot();
  });

  it("renders a disabled day", () => {
    const output = render({
      date: date(2018, 7, 12),
      marking: {},
      state: "disabled"
    });

    expect(output).toMatchSnapshot();
  });

  describe("interaction", () => {
    it("responds to press", () => {
      const onPress = jest.fn();
      const output = render({ date: date(2018, 7, 12), onPress, marking: {} });

      output.simulate("press");

      expect(onPress).toHaveBeenCalled();
    });

    it("responds to long press", () => {
      const onLongPress = jest.fn();
      const output = render({
        date: date(2018, 7, 12),
        onLongPress,
        marking: {}
      });

      output.simulate("longPress");

      expect(onLongPress).toHaveBeenCalled();
    });

    it("ignores press when disabled", () => {
      const onPress = jest.fn();
      const output = render({
        date: date(2018, 7, 12),
        onPress,
        marking: {},
        state: "disabled"
      });

      output.simulate("press");

      expect(onPress).not.toHaveBeenCalled();
    });

    it("ignores long press when disabled", () => {
      const onLongPress = jest.fn();
      const output = render({
        date: date(2018, 7, 12),
        onLongPress,
        marking: {},
        state: "disabled"
      });

      output.simulate("longPress");

      expect(onLongPress).not.toHaveBeenCalled();
    });
  });
});
