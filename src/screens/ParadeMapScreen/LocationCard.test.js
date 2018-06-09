import React from "react";
import { shallow } from "enzyme";
import LocationCard from "./LocationCard";

it("renders correctly with default props", () => {
  const output = shallow(<LocationCard />);
  expect(output).toMatchSnapshot();
});

it("renders correctly when passed location props", () => {
  const output = shallow(
    <LocationCard name="Hello world" text="This is a location description" />
  );
  expect(output).toMatchSnapshot();
});
