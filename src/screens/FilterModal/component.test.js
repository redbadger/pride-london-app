import React from "react";
import { shallow } from "enzyme";
import FilterModal from "./component";

describe("FilterModal", () => {
  it("renders correctly", () => {
    const navigation = {
      addListener: () => {}
    };
    const eventFilters = {
      price: new Set()
    };
    const output = shallow(
      <FilterModal
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={() => {}}
        onApply={() => {}}
        onCancel={() => {}}
        eventFilters={eventFilters}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("adds willBlur susbscription on mount", () => {
    const removeListener = jest.fn();
    const navigation = {
      addListener: jest.fn(() => ({ remove: removeListener }))
    };
    const eventFilters = {
      price: new Set()
    };
    const onCancel = () => {};

    const output = shallow(
      <FilterModal
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={() => {}}
        onApply={() => {}}
        onCancel={onCancel}
        eventFilters={eventFilters}
      />
    );

    expect(navigation.addListener).toHaveBeenCalledWith("willBlur", onCancel);

    output.unmount();

    expect(removeListener).toHaveBeenCalled();
  });
});
