// @flow
import React from "react";
import { shallow } from "enzyme";
import DateRangePickerDialog from "./DateRangePickerDialog";

it("renders correctly", () => {
  const output = shallow(
    <DateRangePickerDialog
      applyButtonText="Apply"
      dateRange={null}
      onApply={() => {}}
      onCancel={() => {}}
      onChange={() => {}}
      visible
    />
  );
  expect(output).toMatchSnapshot();
});
