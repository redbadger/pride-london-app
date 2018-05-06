// @flow
import React from "react";
import { shallow } from "enzyme";
import EventTile from "./EventTile";

it("renders correctly", () => {
  const output = shallow(
    <EventTile
      name="Hello Pride"
      date="2017-03-17"
      image={{ uri: "http://placekitten.com/200/400", width: 400, height: 200 }}
      eventCategories={["Health", "Music"]}
    />
  );
  expect(output).toMatchSnapshot();
});
