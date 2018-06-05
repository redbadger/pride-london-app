// @flow
import React from "react";
import { shallow } from "enzyme";
import FilterHeader from "./FilterHeader";
import FilterHeaderButton from "./FilterHeaderButton";
import type { Props as ComponentProps } from "./FilterHeader";

const render = (
  props: ComponentProps = {
    dateFilter: null,
    selectedCategories: new Set(),
    onFilterCategoriesPress: () => {},
    onFilterButtonPress: () => {},
    numTagFiltersSelected: 0
  }
) => shallow(<FilterHeader {...props} />);

describe("renders correctly", () => {
  it("with any date and any time", () => {
    const output = render({
      dateFilter: null,
      selectedCategories: new Set(),
      onFilterCategoriesPress: () => {},
      onFilterButtonPress: () => {},
      numTagFiltersSelected: 0
    });
    expect(output).toMatchSnapshot();
  });

  it("with any date and any time (empty time set)", () => {
    const output = render({
      dateFilter: null,
      selectedCategories: new Set(),
      onFilterCategoriesPress: () => {},
      onFilterButtonPress: () => {},
      numTagFiltersSelected: 0
    });
    expect(output).toMatchSnapshot();
  });

  it("with single date and single time", () => {
    const output = render({
      dateFilter: { startDate: "2018-02-02", endDate: "2018-02-02" },
      selectedCategories: new Set(),
      onFilterCategoriesPress: () => {},
      onFilterButtonPress: () => {},
      numTagFiltersSelected: 0
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
      numTagFiltersSelected: 0
    });
    expect(output).toMatchSnapshot();
  });

  it("with tag filters selected", () => {
    const output = render({
      dateFilter: null,
      selectedCategories: new Set(),
      onFilterCategoriesPress: () => {},
      onFilterButtonPress: () => {},
      numTagFiltersSelected: 2
    });
    expect(output).toMatchSnapshot();
  });
});
