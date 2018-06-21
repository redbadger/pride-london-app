// @flow
import React from "react";
import { shallow } from "enzyme";
import ParadeGroupsScreen, { sortAndGroupByName } from "./component";
import {
  generateParadeGroup,
  sampleArrayOf,
  sampleOne
} from "../../data/__test-data";

it("renders correctly", () => {
  const paradeGroups = [
    sampleOne(generateParadeGroup, { seed: 5432 }),
    sampleOne(generateParadeGroup, { seed: 4534 }),
    sampleOne(generateParadeGroup, { seed: 3456 })
  ];
  const output = shallow(<ParadeGroupsScreen paradeGroups={paradeGroups} />);
  expect(output).toMatchSnapshot();
});

describe("#sortAndGroupByName", () => {
  it("sorts ParadeGroups by name and groups them", () => {
    const paradeGroups = sampleArrayOf(generateParadeGroup)(10);
    const output = sortAndGroupByName(paradeGroups);
    expect(output).toMatchSnapshot();
  });
});
