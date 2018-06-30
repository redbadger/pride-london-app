// @flow
import React from "react";
import { shallow } from "enzyme";
import BadConnection from "./BadConnection";

it("renders correctly when showing", () => {
  const output = shallow(
    <BadConnection getData={() => {}} noDataReceived={false} loading={false} />
  );

  expect(output).toMatchSnapshot();
});

it("renders correctly when with no data", () => {
  const output = shallow(
    <BadConnection getData={() => {}} noDataReceived loading={false} />
  );

  expect(output).toMatchSnapshot();
});

it("renders correctly when with no data and loading", () => {
  const output = shallow(
    <BadConnection getData={() => {}} noDataReceived loading />
  );

  expect(output).toMatchSnapshot();
});
