// @flow
import React from "react";
import { shallow } from "enzyme";
import ParadeGroupsScreen from "./component";

it("renders correctly", () => {
  const paradeGroups = [
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
    },
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
  ];
  const output = shallow(<ParadeGroupsScreen paradeGroups={paradeGroups} />);
  expect(output).toMatchSnapshot();
});
