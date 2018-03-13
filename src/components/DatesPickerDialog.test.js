// @flow
import React from "react";
import { shallow } from "enzyme";
import DatesPickerDialog from "./DatesPickerDialog";

it("renders correctly", () => {
  const output = shallow(
    <DatesPickerDialog onDatesSelected={() => {}} onCancel={() => {}} visible />
  );
  expect(output).toMatchSnapshot();
});
