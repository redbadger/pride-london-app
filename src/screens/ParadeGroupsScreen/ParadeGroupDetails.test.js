// @flow
import React from "react";
import { shallow } from "enzyme";
import ParadeGroupDetails from "./ParadeGroupDetails";

it("renders correctly with all fields", () => {
  const paradeGroup = {
    contentType: "paradeGroup",
    id: "ABC",
    locale: "en-GB",
    revision: 1,
    fields: {
      name: "A Test Parade Group",
      facebookUrl: "https://red-badger.com",
      twitterUrl: "https://red-badger.com",
      websiteUrl: "https://red-badger.com"
    }
  };
  const output = shallow(<ParadeGroupDetails paradeGroup={paradeGroup} />);
  expect(output).toMatchSnapshot();
});

it("renders correctly with missing fields", () => {
  const paradeGroup = {
    contentType: "paradeGroup",
    id: "DEF",
    locale: "en-GB",
    revision: 1,
    fields: {
      name: "Test Parade Group",
      facebookUrl: null,
      twitterUrl: null,
      websiteUrl: null
    }
  };
  const output = shallow(<ParadeGroupDetails paradeGroup={paradeGroup} />);
  expect(output).toMatchSnapshot();
});
