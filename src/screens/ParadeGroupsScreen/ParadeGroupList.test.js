// @flow
import React from "react";
import { shallow } from "enzyme";
import ParadeGroupList from "./ParadeGroupList";

describe("ParadeGroupList", () => {
  const paradeGroups = [
    [
      {
        contentType: "paradeGroup",
        id: "ABC",
        locale: "en-GB",
        revision: 1,
        fields: {
          name: "A Test Parade Group",
          section: "Section A",
          facebookUrl: "https://red-badger.com",
          twitterUrl: "https://red-badger.com",
          websiteUrl: "https://red-badger.com"
        }
      }
    ],
    [
      {
        contentType: "paradeGroup",
        id: "DEF",
        locale: "en-GB",
        revision: 1,
        fields: {
          name: "Test Parade Group",
          section: "Section B",
          facebookUrl: null,
          twitterUrl: null,
          websiteUrl: null
        }
      }
    ]
  ];
  const render = props =>
    shallow(<ParadeGroupList paradeGroups={paradeGroups} {...props} />);

  it("renders correctly", () => {
    const output = render();
    expect(output).toMatchSnapshot();
  });

  it.skip("renders section headers correctly", () => {
    const renderSectionHeader = render().prop("renderSectionHeader");
    const output = renderSectionHeader({ section: { data: paradeGroups[0] } });

    expect(output).toMatchSnapshot();
  });

  it.skip("renders section footers correctly", () => {
    const renderSectionFooter = render().prop("renderSectionFooter");
    const output = renderSectionFooter({ section: { data: paradeGroups[0] } });

    expect(output).toMatchSnapshot();
  });

  it.skip("renders items correctly", () => {
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

  it.skip("renders item separators correctly", () => {
    const ItemSeparatorComponent = render().prop("ItemSeparatorComponent");
    const output = shallow(<ItemSeparatorComponent />);

    expect(output).toMatchSnapshot();
  });

  it.skip("renders section separators correctly", () => {
    const SectionSeparatorComponent = render().prop(
      "SectionSeparatorComponent"
    );
    const output = shallow(<SectionSeparatorComponent />);

    expect(output).toMatchSnapshot();
  });

  it.skip("extracts keys correctly", () => {
    const keyExtractor = render().prop("keyExtractor");
    const key = keyExtractor(paradeGroups[0][0]);

    expect(key).toBe(paradeGroups[0][0].id);
  });
});
