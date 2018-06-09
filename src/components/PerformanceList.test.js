// @flow
import React from "react";
import { shallow } from "enzyme";
import { generatePerformance, sampleArrayOf } from "../data/__test-data";
import type { Performance } from "../data/performance";
import PerformanceList from "./PerformanceList";

it("renders correctly", () => {
  const performances: Performance[][] = [
    sampleArrayOf(generatePerformance)(2),
    sampleArrayOf(generatePerformance)(2)
  ];
  const output = shallow(<PerformanceList performancePeriods={performances} />);
  expect(output).toMatchSnapshot();
});
