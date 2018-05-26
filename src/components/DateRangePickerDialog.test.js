// @flow
import React from "react";
import { shallow } from "enzyme";
import DateRangePickerDialog from "./DateRangePickerDialog";
import Dialog from "./Dialog";
import type { DateRange } from "../data/date-time";

const render = props =>
  shallow(
    <DateRangePickerDialog
      applyButtonText="Apply"
      applyButtonLabel="Apply selection"
      dateRange={(null: ?DateRange)}
      onApply={() => {}}
      onCancel={() => {}}
      onChange={() => {}}
      visible
      disabled
      forceNewRange={false}
      {...props}
    />
  );

describe("renders correctly", () => {
  it("without date selection", () => {
    const output = render();
    expect(output).toMatchSnapshot();
  });

  it("with date selection", () => {
    const output = render({
      dateRange: { startDate: "2018-02-02", endDate: "2018-02-02" }
    });
    expect(output).toMatchSnapshot();
  });

  it("with range selection", () => {
    const output = render({
      dateRange: { startDate: "2018-02-02", endDate: "2018-02-08" }
    });
    expect(output).toMatchSnapshot();
  });
});

it("calls onChange with null when user presses clear button", () => {
  const onChange = jest.fn();
  const output = render({ onChange });
  const clearButton = output.find(Dialog).prop("headerRight");
  clearButton.props.onPress();

  expect(onChange).toHaveBeenCalledWith(null);
});
