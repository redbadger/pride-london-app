// @flow
import React from "react";
import { shallow } from "enzyme";
import TextLink from "./TextLink";

it("renders correctly", () => {
  const output = shallow(<TextLink onPress={() => {}}>Some text</TextLink>);
  expect(output).toMatchSnapshot();
});
