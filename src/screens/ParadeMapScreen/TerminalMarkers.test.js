// @flow
import React from "react";
import { shallow } from "enzyme";
import { Marker } from "react-native-maps";
import TerminalMarkers from "./TerminalMarkers";
import { terminals } from "../../constants/parade-coordinates";

describe("TerminalMarkers component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <TerminalMarkers
        terminals={terminals}
        onMarkerPress={() => {}}
        onMarkerSelect={() => {}}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders nothing when no terminals provided", () => {
    const output = shallow(
      <TerminalMarkers
        terminals={[]}
        onMarkerPress={() => {}}
        onMarkerSelect={() => {}}
      />
    );
    expect(output.children().length).toBe(0);
  });

  it("calls onMarkerPress function when pressed", () => {
    const mockHandleMarkerPress = jest.fn();
    const output = shallow(
      <TerminalMarkers
        terminals={terminals}
        onMarkerPress={mockHandleMarkerPress}
        onMarkerSelect={() => {}}
      />
    );

    output
      .find(Marker)
      .first()
      .simulate("press");

    expect(mockHandleMarkerPress).toHaveBeenCalled();
  });
});
