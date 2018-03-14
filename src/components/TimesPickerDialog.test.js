// @flow
import React from "react";
import { shallow } from "enzyme";
import TimesPickerDialog from "./TimesPickerDialog";

it("renders correctly", () => {
  const output = shallow(
    <TimesPickerDialog onTimesSelected={() => {}} onCancel={() => {}} visible />
  );
  expect(output).toMatchSnapshot();
});
