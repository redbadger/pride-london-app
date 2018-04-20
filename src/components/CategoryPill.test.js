// @flow
import React from "react";
import { shallow } from "enzyme";
import * as colors from "../constants/colors";

import CategoryPill from "./CategoryPill";

const render = props => shallow(<CategoryPill {...props} />);

describe("CategoryPill Component", () => {
  it("renders correctly", () => {
    expect(render({ name: "Music" })).toMatchSnapshot();
  });

  it("renders pills with the category color", () => {
    const expectedColor = colors.brightLightBlueColor;
    const output = render({ name: "Community" });

    const pillCustomStyles = output.prop("style")[1];

    expect(pillCustomStyles.backgroundColor).toEqual(expectedColor);
  });
});
