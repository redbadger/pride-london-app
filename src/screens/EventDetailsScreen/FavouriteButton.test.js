// @flow
import React from "react";
import { shallow } from "enzyme";
import FavouriteButton from "./FavouriteButton";

it("renders correctly", () => {
  const output = shallow(<FavouriteButton />);
  expect(output).toMatchSnapshot();
});
