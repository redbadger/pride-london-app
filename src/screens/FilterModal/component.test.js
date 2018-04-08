import React from "react";
import { shallow } from "enzyme";
import FilterModal from "./component";

describe("FilterModal", () => {
  it("renders correctly", () => {
    const navigation = {
      addListener: () => {}
    };
    const output = shallow(
      <FilterModal
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={() => {}}
        onApply={() => {}}
        onCancel={() => {}}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("adds willBlur susbscription on mount", () => {
    const removeListener = jest.fn();
    const navigation = {
      addListener: jest.fn(() => ({ remove: removeListener }))
    };
    const onCancel = () => {};

    const output = shallow(
      <FilterModal
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={() => {}}
        onApply={() => {}}
        onCancel={onCancel}
      />
    );

    expect(navigation.addListener).toHaveBeenCalledWith("willBlur", onCancel);

    output.unmount();

    expect(removeListener).toHaveBeenCalled();
  });
});
