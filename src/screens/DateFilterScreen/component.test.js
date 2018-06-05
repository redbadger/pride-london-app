import React from "react";
import { shallow } from "enzyme";
import DateFilterScreen from "./component";

const noOp = () => {};

describe("DateFilterScreen", () => {
  let defaultNavigation;
  beforeEach(() => {
    defaultNavigation = {
      addListener: noOp,
      setParams: noOp
    };
  });
  it("renders correctly", () => {
    const output = shallow(
      <DateFilterScreen
        applyButtonLabel="Show all 26 events"
        navigation={defaultNavigation}
        applyButtonText="Show 26 events"
        onChange={noOp}
        onCancel={noOp}
        onReset={noOp}
        onApply={noOp}
        forceNewRange={false}
        dateRange={undefined}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("dispatches empty filters when 'Reset' button is pressed", () => {
    const onReset = jest.fn();

    const output = shallow(
      <DateFilterScreen
        applyButtonLabel="Show all 26 events"
        navigation={defaultNavigation}
        applyButtonText="Show 26 events"
        onChange={noOp}
        onCancel={noOp}
        onApply={noOp}
        onReset={onReset}
        forceNewRange={false}
        dateRange={undefined}
      />
    );

    const header = output.find("Header");
    header.props().onReset();

    expect(onReset).toHaveBeenCalledWith();
  });

  it("dispatches empty filters when 'Back' button is pressed", () => {
    const onCancel = jest.fn();

    const output = shallow(
      <DateFilterScreen
        applyButtonLabel="Show all 26 events"
        navigation={defaultNavigation}
        applyButtonText="Show 26 events"
        onChange={noOp}
        onReset={noOp}
        onApply={noOp}
        onCancel={onCancel}
        forceNewRange={false}
        dateRange={undefined}
      />
    );

    const header = output.find("Header");
    header.props().onCancel();

    expect(onCancel).toHaveBeenCalledWith();
  });

  it("dispatches state update when Button is pressed", () => {
    const onApply = jest.fn();

    const output = shallow(
      <DateFilterScreen
        applyButtonLabel="Show all 26 events"
        navigation={defaultNavigation}
        applyButtonText="Show 26 events"
        onChange={noOp}
        onReset={noOp}
        onCancel={noOp}
        onApply={onApply}
        forceNewRange={false}
        dateRange={undefined}
      />
    );

    const button = output.find("Button").first();
    button.props().onPress();

    expect(onApply).toHaveBeenCalledWith();
  });

  it("has title with a date range selected", () => {
    const onCancel = jest.fn();

    const output = shallow(
      <DateFilterScreen
        applyButtonLabel="Show all 26 events"
        navigation={defaultNavigation}
        applyButtonText="Show 26 events"
        onChange={noOp}
        onReset={noOp}
        onCancel={onCancel}
        forceNewRange={false}
        dateRange={{
          startDate: "2018-06-06",
          endDate: "2018-06-07"
        }}
      />
    );

    const header = output.find("Header");

    expect(header.props().title).toEqual("6 Jun - 7 Jun");
    expect(header.props().titleLabel).toEqual("Selected: 6 Jun - 7 Jun ");
  });
});
