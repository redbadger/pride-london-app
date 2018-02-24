import React from "react";
import { shallow } from "enzyme";
import Component from "./component";

describe("EventsScreen Component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <Component
        navigation={{ navigate: () => {} }}
        events={[]}
        loaded
        refreshing={false}
        updateEvents={() => {}}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders loading indicator when loading", () => {
    const output = shallow(
      <Component
        navigation={{ navigate: () => {} }}
        events={[]}
        loaded={false}
        refreshing={false}
        updateEvents={() => {}}
      />
    );

    const loadingText = output.find("Text");

    expect(loadingText.children().text()).toEqual("Loading...");
  });
});
