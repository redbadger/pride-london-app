// @flow
import React from "react";
import { shallow } from "enzyme";
import EventTile from "./EventTile";
import categories from "../constants/event-categories";

it("renders correctly", () => {
  const output = shallow(
    <EventTile
      name="Hello Pride"
      date="2017-03-17"
      imageUrl="http://placekitten.com/200/400"
      eventCategories={["Health", "Music"]}
    />
  );
  expect(output).toMatchSnapshot();
});
