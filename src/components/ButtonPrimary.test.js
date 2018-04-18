// @flow
import React from "react";
import { shallow } from "enzyme";
import Button from "./ButtonPrimary";

it("renders correctly", () => {
  const output = shallow(<Button onPress={() => {}}>Test</Button>);
  expect(output).toMatchSnapshot();
});

it("can be disabled", () => {
  const output = shallow(<Button disabled>Test</Button>);
  expect(output).toMatchSnapshot();
});
