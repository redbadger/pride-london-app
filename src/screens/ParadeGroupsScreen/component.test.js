// @flow
import React from "react";
import { shallow } from "enzyme";
import ParadeGroupsScreen from "./component";
import { generateParadeGroup, sampleOne } from "../../data/__test-data";

it("renders correctly", () => {
  const paradeGroups = [
    sampleOne(generateParadeGroup, { seed: 5432 }),
    sampleOne(generateParadeGroup, { seed: 4534 }),
    sampleOne(generateParadeGroup, { seed: 3456 })
  ];
  const output = shallow(<ParadeGroupsScreen paradeGroups={paradeGroups} />);
  expect(output).toMatchSnapshot();
});
