// @flow
import React from "react";
import { shallow } from "enzyme";
import Welcome from "./Welcome";

it("renders correctly when showing", () => {
  const output = shallow(
    <Welcome
      animationProgress={null}
      getData={() => {}}
      noDataReceived={false}
      loading={false}
    />
  );

  expect(output).toMatchSnapshot();
});

it("renders correctly when with no data", () => {
  const output = shallow(
    <Welcome
      animationProgress={null}
      getData={() => {}}
      noDataReceived
      loading={false}
    />
  );

  expect(output).toMatchSnapshot();
});
