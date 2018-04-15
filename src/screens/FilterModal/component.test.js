import React from "react";
import { shallow } from "enzyme";
import FilterModal from "./component";

describe("FilterModal", () => {
  it("renders correctly", () => {
    const navigation = {
      addListener: () => {},
      setParams: () => {}
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
      addListener: jest.fn(() => ({ remove: removeListener })),
      setParams: () => {}
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

  it("dispatches empty filters when 'Clear all' button is pressed", () => {
    let handleClearFunc;
    const navigation = {
      addListener: () => {},
      setParams: params => {
        handleClearFunc = params.handleClear;
      }
    };
    const eventFilters = {
      price: new Set()
    };
    const onChange = jest.fn();

    shallow(
      <FilterModal
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={onChange}
        onApply={() => {}}
        onCancel={() => {}}
        eventFilters={eventFilters}
      />
    );

    handleClearFunc();

    expect(onChange).toHaveBeenCalledWith({
      area: new Set(),
      price: new Set(),
      audience: new Set(),
      timeOfDay: new Set(),
      venueDetails: new Set(),
      accessibilityOptions: new Set()
    });
  });
});
