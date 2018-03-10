import React from "react";
import { shallow } from "enzyme";
import Component from "./component";

describe("HomeScreen Component", () => {
  it("renders correctly", () => {
    const output = shallow(<Component loading={false} events={[]} />);
    expect(output).toMatchSnapshot();
  });

  it("renders loading indicator when loading", () => {
    const output = shallow(<Component loading events={[]} />);

    const loadingText = output.find("Text").first();

    expect(loadingText.children().text()).toEqual("Loading...");
  });
});
