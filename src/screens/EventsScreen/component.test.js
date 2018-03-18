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
      />
    );
    expect(output).toMatchSnapshot();
  });
});
