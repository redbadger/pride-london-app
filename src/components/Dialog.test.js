// @flow
import React from "react";
import { shallow } from "enzyme";
import Dialog from "./Dialog";

it("renders correctly", () => {
  const output = shallow(
    <Dialog
      applyButtonText="Bye"
      applyButtonLabel="Good bye"
      onApply={() => {}}
      title="Hello World"
      visible
      disabled
    >
      Lorem Ipsum is placeholder text commonly used...
    </Dialog>
  );
  expect(output).toMatchSnapshot();
});
