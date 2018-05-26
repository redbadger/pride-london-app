import React from "react";
import { shallow } from "enzyme";
import FilterScreen from "./component";

describe("FilterScreen", () => {
  it("renders correctly", () => {
    const navigation = {
      addListener: () => {},
      setParams: () => {}
    };
    const eventFilters = {
      price: new Set()
    };
    const output = shallow(
      <FilterScreen
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
      <FilterScreen
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
      <FilterScreen
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
      <FilterScreen
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
      <FilterScreen
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={() => {}}
        onApply={() => {}}
        onCancel={() => {}}
        eventFilters={eventFilters}
        numTagFiltersSelected={eventFilters.price.size}
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
      <FilterScreen
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={() => {}}
        onApply={() => {}}
        onCancel={() => {}}
        eventFilters={eventFilters}
        numTagFiltersSelected={eventFilters.price.size}
        numEventsSelected={1}
      />
    );

    const header = output.find("Header");
    expect(header.props().showClear).toBe(false);
  });

  it("dispatches new filter when checkbox checked", () => {
    const navigation = {
      addListener: () => {}
    };
    const eventFilters = {
      price: new Set()
    };
    const onChangeSpy = jest.fn();
    const output = shallow(
      <FilterScreen
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={onChangeSpy}
        onApply={() => {}}
        onCancel={() => {}}
        eventFilters={eventFilters}
        numTagFiltersSelected={eventFilters.price.size}
        numEventsSelected={1}
      />
    );

    output.instance().handleCheckboxChange("price", "free");

    expect(onChangeSpy).toHaveBeenCalledWith({ price: new Set(["free"]) });
  });

  it("dispatches filter removed when checkbox unchecked", () => {
    const navigation = {
      addListener: () => {}
    };
    const eventFilters = {
      price: new Set(["free"])
    };
    const onChangeSpy = jest.fn();
    const output = shallow(
      <FilterScreen
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={onChangeSpy}
        onApply={() => {}}
        onCancel={() => {}}
        eventFilters={eventFilters}
        numTagFiltersSelected={eventFilters.price.size}
        numEventsSelected={1}
      />
    );

    output.instance().handleCheckboxChange("price", "free");

    expect(onChangeSpy).toHaveBeenCalledWith({ price: new Set() });
  });

  it("calls on apply and goes back in navigation when apply button pressed", () => {
    const navigation = {
      addListener: () => {},
      goBack: jest.fn()
    };
    const eventFilters = {
      price: new Set(["free"])
    };
    const onApplySpy = jest.fn();
    const output = shallow(
      <FilterScreen
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={() => {}}
        onApply={onApplySpy}
        onCancel={() => {}}
        eventFilters={eventFilters}
        numTagFiltersSelected={eventFilters.price.size}
        numEventsSelected={1}
      />
    );

    output.find("Button").simulate("Press");

    expect(onApplySpy).toHaveBeenCalled();
    expect(navigation.goBack).toHaveBeenCalled();
  });
});
