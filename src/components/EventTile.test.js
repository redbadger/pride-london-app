// @flow
import React from "react";
import { shallow } from "enzyme";
import { generateFieldRef, sampleOne } from "../data/__test-data";
import EventTile from "./EventTile";

it("renders correctly", () => {
  const output = shallow(
    <EventTile
      name="Hello Pride"
      date="2017-03-17"
      imageReference={sampleOne(generateFieldRef)}
      eventCategories={["Health", "Music"]}
    />
  );
  expect(output).toMatchSnapshot();
});
