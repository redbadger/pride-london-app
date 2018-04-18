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
    const navigation = {
      addListener: () => {}
    };
    const eventFilters = {
      price: new Set()
    };
    const onChange = jest.fn();

    const output = shallow(
      <FilterModal
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={onChange}
        onApply={() => {}}
        onCancel={() => {}}
        eventFilters={eventFilters}
      />
    );

    const header = output.find("Header");
    header.props().onClearPress();

    expect(onChange).toHaveBeenCalledWith({
      area: new Set(),
      price: new Set(),
      audience: new Set(),
      timeOfDay: new Set(),
      venueDetails: new Set(),
      accessibilityOptions: new Set()
    });
  });

  it("sets button to disabled when no events selected", () => {
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
        numEventsSelected={0}
      />
    );

    const button = output.find("Button");
    expect(button.props().disabled).toBe(true);
  });

  it("passes showClear=true to header when filters selected", () => {
    const navigation = {
      addListener: () => {}
    };
    const eventFilters = {
      price: new Set(["free"])
    };

    const output = shallow(
      <FilterModal
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={() => {}}
        onApply={() => {}}
        onCancel={() => {}}
        eventFilters={eventFilters}
        numEventsSelected={1}
      />
    );

    const header = output.find("Header");
    expect(header.props().showClear).toBe(true);
  });

  it("passes showClear=false to header when no filters selected", () => {
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
        numEventsSelected={1}
      />
    );

    const header = output.find("Header");
    expect(header.props().showClear).toBe(false);
  });
});
