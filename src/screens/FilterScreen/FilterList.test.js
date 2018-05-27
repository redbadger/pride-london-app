import React from "react";
import { shallow } from "enzyme";
import FilterList from "./FilterList";

describe("FilterList", () => {
  it("renders correctly", () => {
    const output = shallow(
      <FilterList
        sectionName="price"
        sectionFilters={new Set(["free"])}
        size="small"
        handleCheckboxChange={() => {}}
      />
    );

    expect(output).toMatchSnapshot();
  });

  it("passes section name and value to onChange function", () => {
    const onChangeSpy = jest.fn();
    const output = shallow(
      <FilterList
        sectionName="price"
        sectionFilters={new Set(["free"])}
        size="small"
        handleCheckboxChange={onChangeSpy}
      />
    );

    const { onChange } = output.find("CheckBox").props();
    onChange();

    expect(onChangeSpy).toHaveBeenCalledWith("price", "free");
  });
});
