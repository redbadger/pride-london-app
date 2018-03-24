import React from "react";
import { shallow } from "enzyme";
import Component from "./component";

describe("EventsScreen Component", () => {
  it("renders correctly", () => {
    const output = shallow(
      <Component
        navigation={{ navigate: () => {} }}
        events={[]}
        loading={false}
        refreshing={false}
        updateEvents={() => {}}
        getAssetById={() => {}}
      />
    );
    expect(output).toMatchSnapshot();
  });

  it("renders loading indicator when loading", () => {
    const output = shallow(
      <Component
        navigation={{ navigate: () => {} }}
        events={[]}
        loading
        refreshing={false}
        updateEvents={() => {}}
        getAssetById={() => {}}
      />
    );

    const loadingText = output.find("Text");

    expect(loadingText.children().text()).toEqual("Loading...");
  });
});
