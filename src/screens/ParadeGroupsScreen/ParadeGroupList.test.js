// @flow
import React from "react";
import { shallow } from "enzyme";
import ParadeGroupList, { sectionTitle } from "./ParadeGroupList";
import { generateParadeGroup, sampleOne } from "../../data/__test-data";

describe("ParadeGroupList", () => {
  const paradeGroups = [
    [sampleOne(generateParadeGroup, { seed: 5432 })],
    [sampleOne(generateParadeGroup, { seed: 4534 })]
  ];
  const render = props =>
    shallow(<ParadeGroupList paradeGroups={paradeGroups} {...props} />);

  it("renders correctly", () => {
    const output = render();
    expect(output).toMatchSnapshot();
  });

  it("renders header correctly", () => {
    const renderHeader = render().prop("ListHeaderComponent");
    const output = renderHeader();

    expect(output).toMatchSnapshot();
  });

  it("renders section headers correctly", () => {
    const renderSectionHeader = render().prop("renderSectionHeader");
    const output = renderSectionHeader({ section: { data: paradeGroups[0] } });

    expect(output).toMatchSnapshot();
  });

  it("renders items correctly", () => {
    const renderItem = render().prop("renderItem");
    const output = renderItem({
      item: paradeGroups[0][0],
      index: 0,
      section: {
        index: 0
      }
    });

    expect(output).toMatchSnapshot();
  });

  it("renders item separators correctly", () => {
    const ItemSeparatorComponent = render().prop("ItemSeparatorComponent");
    const output = shallow(<ItemSeparatorComponent />);

    expect(output).toMatchSnapshot();
  });

  it("extracts keys correctly", () => {
    const keyExtractor = render().prop("keyExtractor");
    const key = keyExtractor(paradeGroups[0][0]);

    expect(key).toBe(paradeGroups[0][0].id);
  });
});

describe("sectionTitle", () => {
  it("returns the first letter of the name in uppercase", () => {
    const paradeGroup = sampleOne(generateParadeGroup, { seed: 5432 });
    paradeGroup.fields.name = "a parade group name";
    expect(sectionTitle(paradeGroup)).toEqual("A");
  });

  it("returns # if the first letter of the name is numeric", () => {
    const paradeGroup = sampleOne(generateParadeGroup, { seed: 3245 });
    paradeGroup.fields.name = "7 Dwarves";
    expect(sectionTitle(paradeGroup)).toEqual("#");
  });

  it("returns # if the first letter of the name is a symbol", () => {
    const paradeGroup = sampleOne(generateParadeGroup, { seed: 3245 });
    paradeGroup.fields.name = "$$$";
    expect(sectionTitle(paradeGroup)).toEqual("#");
  });
});
