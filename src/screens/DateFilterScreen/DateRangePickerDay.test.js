// @flow
import React from "react";
import { shallow } from "enzyme";
import DateRangePickerDay from "./DateRangePickerDay";
import * as dateLib from "../../lib/date";

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

describe("dateRangePickerDay", () => {
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

  it("renders a disabled day if before today", () => {
    jest
      .spyOn(dateLib, "now")
      .mockImplementation(() => "2018-08-13T17:42:06+01:00");

    const output = render({
      date: date(2018, 7, 12),
      marking: {}
    });

    expect(output.props().disabled).toEqual(true);
    expect(output.props().accessibilityTraits).toContain("disabled");
    expect(output).toMatchSnapshot();
  });

  it("does not render a disabled day if same day as today", () => {
    jest
      .spyOn(dateLib, "now")
      .mockImplementation(() => "2018-08-12T17:42:06+01:00");

    const output = render({
      date: date(2018, 7, 12),
      marking: {}
    });

    expect(output.props().disabled).toEqual(false);
    expect(output.props().accessibilityTraits).not.toContain("disabled");
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
  });

  describe("#shouldComponentUpdate", () => {
    const props = {
      date: date(2018, 7, 12),
      marking: { selected: true, startingDay: true, endingDay: true }
    };

    it("stops update if state markings and date are the same", () => {
      const nextProps = {
        date: date(2018, 7, 12),
        marking: { selected: true, startingDay: true, endingDay: true },
        disabled: false
      };

      const output = render(props);
      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(false);
    });

    it("updates when markings change", () => {
      const nextProps = {
        date: date(2018, 7, 12),
        marking: { selected: true, endingDay: true }
      };

      const output = render(props);
      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });

    it("updates when date changes", () => {
      const nextProps = {
        date: date(2018, 8, 12),
        marking: { selected: true, startingDay: true, endingDay: true }
      };

      const output = render(props);
      const shouldUpdate = output.instance().shouldComponentUpdate(nextProps);

      expect(shouldUpdate).toBe(true);
    });
  });
});
