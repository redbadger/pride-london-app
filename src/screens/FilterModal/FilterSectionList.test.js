import React from "react";
import { shallow } from "enzyme";
import FilterSectionList from "./FilterSectionList";

describe("FilterSectionList", () => {
  it("renders correctly", () => {
    const eventFilters = {
      price: new Set(["free"])
    };
    const output = shallow(
      <FilterSectionList
        eventFilters={eventFilters}
        handleCheckboxChange={() => {}}
      />
    );

    expect(output).toMatchSnapshot();
  });

  it("passes event filters number to section header", () => {
    const eventFilters = {
      price: new Set(["free"])
    };
    const output = shallow(
      <FilterSectionList
        eventFilters={eventFilters}
        handleCheckboxChange={() => {}}
      />
    );

    const { badgeValue } = output.find("SectionHeader").props();

    expect(badgeValue).toBe(1);
  });

  it("passes a null badgeValue to section header when no filters selected", () => {
    const eventFilters = {
      price: new Set()
    };
    const output = shallow(
      <FilterSectionList
        eventFilters={eventFilters}
        handleCheckboxChange={() => {}}
      />
    );

    const { badgeValue } = output.find("SectionHeader").props();

    expect(badgeValue).toBe(null);
  });
});
