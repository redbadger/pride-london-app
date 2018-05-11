// @flow
import React from "react";
import { shallow } from "enzyme";
import ImageHeader from "./ImageHeader";

it("renders correctly", () => {
  const output = shallow(<ImageHeader image={0} title="Fruit" />);
  expect(output).toMatchSnapshot();
});

it("renders correctly with multiple lines", () => {
  const output = shallow(
    <ImageHeader image={0} title={["This is a", "longer heading"]} />
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly with subtitle", () => {
  const output = shallow(
    <ImageHeader image={0} title="Fruit" subtitle="Is very good" />
  );
  expect(output).toMatchSnapshot();
});
