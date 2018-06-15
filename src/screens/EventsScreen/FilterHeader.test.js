// @flow
import React from "react";
import { shallow } from "enzyme";
import FilterHeader from "./FilterHeader";
import type { Props as ComponentProps } from "./FilterHeader";
import FilterHeaderButton from "./FilterHeaderButton";
import FilterHeaderCategories from "./FilterHeaderCategories";
import ResetAllFiltersButton from "./ResetAllFiltersButton";

const render = (
  props: ComponentProps = {
    dateFilter: null,
    selectedCategories: new Set(),
    onFilterCategoriesPress: () => {},
    onFilterButtonPress: () => {},
    onDateFilterButtonPress: () => {},
    resetAllFiltersPress: () => {},
    numTagFiltersSelected: 0,
    scrollEventListToTop: () => {}
  }
) => shallow(<FilterHeader {...props} />);

describe("renders correctly", () => {
  it("with any date and any time", () => {
    const output = render({
      dateFilter: null,
      selectedCategories: new Set(),
      onFilterCategoriesPress: () => {},
      onFilterButtonPress: () => {},
      onDateFilterButtonPress: () => {},
      resetAllFiltersPress: () => {},
      numTagFiltersSelected: 0,
      scrollEventListToTop: () => {}
    });
    expect(output).toMatchSnapshot();
  });

  it("with any date and any time (empty time set)", () => {
    const output = render({
      dateFilter: null,
      selectedCategories: new Set(),
      onFilterCategoriesPress: () => {},
      onFilterButtonPress: () => {},
      onDateFilterButtonPress: () => {},
      resetAllFiltersPress: () => {},
      numTagFiltersSelected: 0,
      scrollEventListToTop: () => {}
    });
    expect(output).toMatchSnapshot();
  });

  it("with single date and single time", () => {
    const output = render({
      dateFilter: { startDate: "2018-02-02", endDate: "2018-02-02" },
      selectedCategories: new Set(),
      onFilterCategoriesPress: () => {},
      onFilterButtonPress: () => {},
      onDateFilterButtonPress: () => {},
      resetAllFiltersPress: () => {},
      numTagFiltersSelected: 0,
      scrollEventListToTop: () => {}
    });
    expect(output).toMatchSnapshot();
  });

  it("with date range and two times", () => {
    const output = render({
      dateFilter: {
        startDate: "2018-02-02",
        endDate: "2018-02-03"
      },
      selectedCategories: new Set(),
      onFilterCategoriesPress: () => {},
      onFilterButtonPress: () => {},
      onDateFilterButtonPress: () => {},
      resetAllFiltersPress: () => {},
      numTagFiltersSelected: 0,
      scrollEventListToTop: () => {}
    });
    expect(output).toMatchSnapshot();
  });

  it("with tag filters selected", () => {
    const output = render({
      dateFilter: null,
      selectedCategories: new Set(),
      onFilterCategoriesPress: () => {},
      onFilterButtonPress: () => {},
      onDateFilterButtonPress: () => {},
      resetAllFiltersPress: () => {},
      numTagFiltersSelected: 2,
      scrollEventListToTop: () => {}
    });
    expect(output).toMatchSnapshot();
  });
});

describe("filter buttons", () => {
  it("calls onFilterCategoriesPress when users presses categories filter button", () => {
    const mock = jest.fn();
    const output = render({
      dateFilter: null,
      selectedCategories: new Set(),
      onFilterCategoriesPress: mock,
      onFilterButtonPress: () => {},
      onDateFilterButtonPress: () => {},
      resetAllFiltersPress: () => {},
      numTagFiltersSelected: 0,
      scrollEventListToTop: () => {}
    });
    output.find(FilterHeaderCategories).prop("onFilterPress")();

    expect(mock).toBeCalledWith();
  });

  it("calls onDateFilterButtonPress when users presses date filter button", () => {
    const mock = jest.fn();
    const output = render({
      dateFilter: null,
      selectedCategories: new Set(),
      onFilterCategoriesPress: () => {},
      onFilterButtonPress: () => {},
      onDateFilterButtonPress: mock,
      resetAllFiltersPress: () => {},
      numTagFiltersSelected: 0,
      scrollEventListToTop: () => {}
    });
    const button = output.find(FilterHeaderButton).at(0);
    button.simulate("press");

    expect(mock).toBeCalledWith();
  });

  it("calls onFilterButtonPress when users presses attribute filter button", () => {
    const mock = jest.fn();
    const output = render({
      dateFilter: null,
      selectedCategories: new Set(),
      onFilterCategoriesPress: () => {},
      onFilterButtonPress: mock,
      onDateFilterButtonPress: () => {},
      resetAllFiltersPress: () => {},
      numTagFiltersSelected: 0,
      scrollEventListToTop: () => {}
    });
    const button = output.find(FilterHeaderButton).at(1);
    button.simulate("press");

    expect(mock).toBeCalledWith();
  });

  it("calls scrollEventListToTop when users presses 'Reset all filters' button", () => {
    const mock = jest.fn();
    const output = render({
      dateFilter: null,
      selectedCategories: new Set(["Music"]),
      onFilterCategoriesPress: () => {},
      onFilterButtonPress: () => {},
      onDateFilterButtonPress: () => {},
      resetAllFiltersPress: () => {},
      numTagFiltersSelected: 0,
      scrollEventListToTop: mock
    });
    output
      .find(ResetAllFiltersButton)
      .props()
      .onPress();

    expect(mock).toBeCalledWith();
  });
});
