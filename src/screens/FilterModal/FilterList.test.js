import React from "react";
import { shallow } from "enzyme";
import FilterList from "./FilterList";

describe("FilterList", () => {
  it("renders correctly", () => {
    const eventFilters = {
      price: new Set(["free"])
    };
    const output = shallow(
      <FilterList eventFilters={eventFilters} handleCheckboxChange={() => {}} />
    );

    expect(output).toMatchSnapshot();
  });

  it("passes event filters number to section header", () => {
    const eventFilters = {
      price: new Set(["free"])
    };
    const output = shallow(
      <FilterList eventFilters={eventFilters} handleCheckboxChange={() => {}} />
    );

    const { badgeValue } = output.find("SectionHeader").props();

    expect(badgeValue).toBe(1);
  });

  it("passes a null badgeValue to section header when no filters selected", () => {
    const eventFilters = {
      price: new Set()
    };
    const output = shallow(
      <FilterList eventFilters={eventFilters} handleCheckboxChange={() => {}} />
    );

    const { badgeValue } = output.find("SectionHeader").props();

    expect(badgeValue).toBe(null);
  });
});
