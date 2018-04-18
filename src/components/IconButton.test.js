// @flow
import React from "react";
import { shallow } from "enzyme";
import IconButton from "./IconButton";

it("renders correctly", () => {
  const output = shallow(
    <IconButton
      accessibilityLabel="Super Awesome"
      onPress={() => {}}
      source={{ uri: "/super-awesome-image.jpg" }}
    />
  );
  expect(output).toMatchSnapshot();
});
