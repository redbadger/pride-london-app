import React from "react";
import { shallow } from "enzyme";
import SectionHeader from "./SectionHeader";

it("renders correctly", () => {
  const output = shallow(<SectionHeader title="Section Header" />);
  expect(output).toMatchSnapshot();
});

it("renders correctly without shadow", () => {
  const output = shallow(
    <SectionHeader title="Section Header" hasShadow={false} />
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly with badge text", () => {
  const output = shallow(
    <SectionHeader title="Section Header" badgeValue={2} />
  );
  expect(output).toMatchSnapshot();
});
