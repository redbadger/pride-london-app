// @flow
import React from "react";
import { shallow } from "enzyme";
import ShadowedScrollView from "./ShadowedScrollView";

const render = () => shallow(<ShadowedScrollView />);

it("renders correctly", () => {
  const output = render();
  expect(output).toMatchSnapshot();
});
