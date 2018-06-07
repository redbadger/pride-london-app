// @flow
import React from "react";
import type { NavigationScreenProp } from "react-navigation";
import { shallow } from "enzyme";
import {
  generateEvent,
  generateEventMinimum,
  generatePerformance,
  sampleArrayOf,
  sampleOne
} from "../../data/__test-data";
import Component, {
  EventAccessibility,
  EventCategories,
  EventHeader,
  EventTickets
} from "./component";

const navigation: NavigationScreenProp<{ params: { eventId: string } }> = ({
  goBack: () => {}
}: any);

it("renders correctly", () => {
  const output = shallow(
    <Component
      event={sampleOne(generateEvent)}
      performances={sampleArrayOf(generatePerformance)(3)}
      isSaved
      navigation={navigation}
      toggleSaved={() => {}}
      setCategoryFilter={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly with missing details", () => {
  const output = shallow(
    <Component
      event={sampleOne(generateEventMinimum)}
      performances={[]}
      navigation={navigation}
      toggleSaved={() => {}}
      setCategoryFilter={() => {}}
    />
  );
  expect(output).toMatchSnapshot();
});

describe("EventHeader", () => {
  it("renders correctly", () => {
    const output = shallow(
      <EventHeader isSaved navigation={navigation} toggleSaved={() => {}} />
    );
    expect(output).toMatchSnapshot();
  });
});

describe("EventCategories", () => {
  it("renders correctly", () => {
    const output = shallow(
      <EventCategories
        event={sampleOne(generateEvent)}
        navigation={navigation}
        setCategoryFilter={() => {}}
      />
    );
    expect(output).toMatchSnapshot();
  });
});

describe("EventAccessibility", () => {
  it("renders correctly", () => {
    const output = shallow(<EventAccessibility>Test</EventAccessibility>);
    expect(output).toMatchSnapshot();
  });
});

describe("EventTickets", () => {
  it("renders correctly", () => {
    const output = shallow(<EventTickets url="https://prideinlondon.org/" />);
    expect(output).toMatchSnapshot();
  });
});
