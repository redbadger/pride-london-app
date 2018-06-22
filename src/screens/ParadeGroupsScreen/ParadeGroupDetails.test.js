// @flow
import React from "react";
import { shallow } from "enzyme";
import Touchable from "../../components/Touchable";
import ParadeGroupDetails from "./ParadeGroupDetails";

describe("when collapsed", () => {
  it("renders correctly with all fields", () => {
    const paradeGroup = {
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
        section: "Section B",
        facebookUrl: null,
        twitterUrl: null,
        websiteUrl: null
      }
    };
    const output = shallow(<ParadeGroupDetails paradeGroup={paradeGroup} />);
    expect(output).toMatchSnapshot();
  });
});

describe("when expanded", () => {
  it("renders correctly", () => {
    const paradeGroup = {
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
    };
    const output = shallow(<ParadeGroupDetails paradeGroup={paradeGroup} />);
    const mockRef = {
      measure: jest.fn()
    };
    output.instance().collapsable.current = mockRef;
    output
      .find(Touchable)
      .first()
      .simulate("press");
    mockRef.measure.mock.calls[0][0](0, 0, 0, 100);
    expect(output).toMatchSnapshot();
    expect(output.instance().state.collapsed).toEqual(false);
    expect(output.instance().state.contentHeight).toEqual(100);
  });
});

describe("when expanded then collapsed", () => {
  it("renders correctly", () => {
    const paradeGroup = {
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
    };
    const output = shallow(<ParadeGroupDetails paradeGroup={paradeGroup} />);
    const mockRef = {
      measure: jest.fn()
    };
    output.instance().collapsable.current = mockRef;
    output
      .find(Touchable)
      .first()
      .simulate("press");
    mockRef.measure.mock.calls[0][0](0, 0, 0, 100);
    output
      .find(Touchable)
      .first()
      .simulate("press");
    expect(output).toMatchSnapshot();
    expect(output.instance().state.collapsed).toEqual(true);
  });
});
