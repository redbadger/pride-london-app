// @flow
import React from "react";
import { shallow } from "enzyme";
import TerminalMarkers from "./TerminalMarkers";
import { terminals } from "../../constants/parade-coordinates";

describe("TerminalMarkers component", () => {
  it("renders correctly", () => {
    const output = shallow(<TerminalMarkers terminals={terminals} />);
    expect(output).toMatchSnapshot();
  });

  it("renders nothing when no terminals provided", () => {
    const output = shallow(<TerminalMarkers terminals={[]} />);
    expect(output.children().length).toBe(0);
  });
});
