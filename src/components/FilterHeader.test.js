// @flow
import React from "react";
import { shallow } from "enzyme";
import DateFilterDialog from "./ConnectedDateFilterDialog";
import FilterHeader from "./FilterHeader";
import FilterHeaderButton from "./FilterHeaderButton";
import TimeFilterDialog from "./ConnectedTimeFilterDialog";
import type { DateOrDateRange, Time } from "../data/date-time";

const render = (
  props: {
    dateFilter: ?DateOrDateRange,
    timeFilter: Set<Time>,
    onFilterButtonPress: () => void
  } = {
    dateFilter: null,
    timeFilter: new Set(["morning"]),
    onFilterButtonPress: () => {}
  }
) => shallow(<FilterHeader {...props} />);

describe("renders correctly", () => {
  it("with any date and any time", () => {
    const output = render({
      dateFilter: null,
      timeFilter: new Set(["morning", "afternoon", "evening"]),
      onFilterButtonPress: () => {}
    });
    expect(output).toMatchSnapshot();
  });

  it("with any date and any time (empty time set)", () => {
    const output = render({
      dateFilter: null,
      timeFilter: new Set(),
      onFilterButtonPress: () => {}
    });
    expect(output).toMatchSnapshot();
  });

  it("with single date and single time", () => {
    const output = render({
      dateFilter: "2018-02-02",
      timeFilter: new Set(["afternoon"]),
      onFilterButtonPress: () => {}
    });
    expect(output).toMatchSnapshot();
  });

  it("with date range and two times", () => {
    const output = render({
      dateFilter: {
        startDate: "2018-02-02",
        endDate: "2018-02-03"
      },
      timeFilter: new Set(["morning", "afternoon"]),
      onFilterButtonPress: () => {}
    });
    expect(output).toMatchSnapshot();
  });
});

it("opens date picker when users presses date filter button", () => {
  const output = render();
  const filterDateButton = output.find(FilterHeaderButton).at(0);
  filterDateButton.simulate("press");

  expect(output.state("datesPickerVisible")).toBe(true);
});

it("closes date picker when users presses applies changes", () => {
  const output = render();
  output.setState({ datesPickerVisible: true });

  const datePicker = output.find(DateFilterDialog);
  datePicker.simulate("apply");

  expect(output.state("datesPickerVisible")).toBe(false);
});

it("opens time picker when users presses time filter button", () => {
  const output = render();
  const filterTimeButton = output.find(FilterHeaderButton).at(1);
  filterTimeButton.simulate("press");

  expect(output.state("timesPickerVisible")).toBe(true);
});

it("closes time picker when users presses applies changes", () => {
  const output = render();
  output.setState({ timesPickerVisible: true });

  const timePicker = output.find(TimeFilterDialog);
  timePicker.simulate("apply");

  expect(output.state("timesPickerVisible")).toBe(false);
});
