import React from "react";
import { shallow } from "enzyme";
import DateFilterScreen from "./component";

describe("DateFilterScreen", () => {
  it.only("renders correctly", () => {
    const navigation = {
      addListener: () => {},
      setParams: () => {}
    };
    const output = shallow(
      <DateFilterScreen
        applyButtonLabel="Show all 26 events"
        navigation={navigation}
        applyButtonText="Show 26 events"
        onChange={() => {}}
        onCancel={() => {}}
        onReset={() => {}}
        forceNewRange={false}
        dateRange={undefined}
      />
    );
    expect(output).toMatchSnapshot();
  });
});
