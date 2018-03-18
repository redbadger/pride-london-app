// @flow
import React from "react";
import { shallow } from "enzyme";
import CheckBox from "./CheckBox";
import MultiSelectDialog from "./MultiSelectDialog";

const render = props =>
  shallow(
    <MultiSelectDialog
      applyButtonText="Apply"
      options={["Apples", "Bananas", "Oranges"]}
      selectedIndexes={[1]}
      onApply={() => {}}
      onCancel={() => {}}
      onChange={() => {}}
      title="Select your favorites"
      visible
      {...props}
    />
  );

it("renders correctly", () => {
  const output = render();
  expect(output).toMatchSnapshot();
});

describe("onChange", () => {
  it("adds index to selectedIndexes", () => {
    const onChange = jest.fn();
    const output = render({ onChange, selectedIndexes: [0] });
    const checkBoxOnChange = output
      .find(CheckBox)
      .at(1)
      .prop("onChange");
    checkBoxOnChange();

    expect(onChange).toHaveBeenCalledWith([0, 1]);
  });

  it("removes index to selectedIndexes", () => {
    const onChange = jest.fn();
    const output = render({ onChange, selectedIndexes: [0, 1] });
    const checkBoxOnChange = output
      .find(CheckBox)
      .at(1)
      .prop("onChange");
    checkBoxOnChange();

    expect(onChange).toHaveBeenCalledWith([0]);
  });
});
