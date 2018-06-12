import React from "react";
import { shallow } from "enzyme";
import DateFilterScreen from "./component";

const noOp = () => {};

describe("DateFilterScreen", () => {
  let defaultNavigation;
  beforeEach(() => {
    defaultNavigation = {
      addListener: noOp,
      setParams: noOp,
      goBack: jest.fn()
    };
  });

  it("renders correctly", () => {
    const output = shallow(
      <DateFilterScreen
        navigation={defaultNavigation}
        onChange={noOp}
        dateRange={undefined}
        numberOfEvents={26}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders correctly with date range", () => {
    const output = shallow(
      <DateFilterScreen
        navigation={defaultNavigation}
        onChange={noOp}
        dateRange={{
          startDate: "2018-06-06",
          endDate: "2018-06-07"
        }}
        numberOfEvents={26}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("dispatches empty filters when 'Reset' button is pressed", () => {
    const onChange = jest.fn();
    const output = shallow(
      <DateFilterScreen
        navigation={defaultNavigation}
        onChange={onChange}
        dateRange={{
          startDate: "2018-06-06",
          endDate: "2018-06-07"
        }}
        numberOfEvents={26}
      />
    );

    const resetButton = output.find("Header").prop("rightElement");
    shallow(resetButton).simulate("press");

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("goes back when 'Back' button is pressed", () => {
    const output = shallow(
      <DateFilterScreen
        navigation={defaultNavigation}
        onChange={noOp}
        dateRange={undefined}
        numberOfEvents={26}
      />
    );

    const backButton = output.find("Header").prop("leftElement");
    shallow(backButton).simulate("press");

    expect(defaultNavigation.goBack).toHaveBeenCalledWith();
  });

  it("goes back when apply button is pressed", () => {
    const output = shallow(
      <DateFilterScreen
        navigation={defaultNavigation}
        onChange={noOp}
        dateRange={undefined}
        numberOfEvents={26}
      />
    );

    const button = output.find("Button").first();
    button.props().onPress();

    expect(defaultNavigation.goBack).toHaveBeenCalledWith();
  });

  it("has title with a single date selected", () => {
    const output = shallow(
      <DateFilterScreen
        navigation={defaultNavigation}
        onChange={noOp}
        dateRange={{
          startDate: "2018-06-06",
          endDate: "2018-06-06"
        }}
        numberOfEvents={26}
      />
    );

    const header = output.find("Header");

    expect(header.props().title).toEqual("6 Jun");
    expect(header.props().titleLabel).toEqual(
      "Selected: 6 Jun, pick another day to select range"
    );
  });

  it("has title with a date range selected", () => {
    const output = shallow(
      <DateFilterScreen
        navigation={defaultNavigation}
        onChange={noOp}
        dateRange={{
          startDate: "2018-06-06",
          endDate: "2018-06-07"
        }}
        numberOfEvents={26}
      />
    );

    const header = output.find("Header");

    expect(header.props().title).toEqual("6 Jun - 7 Jun");
    expect(header.props().titleLabel).toEqual("Selected: 6 Jun - 7 Jun");
  });
});
