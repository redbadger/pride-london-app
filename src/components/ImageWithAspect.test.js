// @flow
import React from "react";
import { shallow } from "enzyme";
import ImageWithAspect from "./ImageWithAspect";

it("renders correctly", () => {
  const output = shallow(
    <ImageWithAspect
      ratio={2 / 1}
      source={{ uri: "/super-awesome-image.jpg" }}
    />
  );
  expect(output).toMatchSnapshot();
});

it("recalcualtes width on layout event", () => {
  const output = shallow(
    <ImageWithAspect
      ratio={2 / 1}
      source={{ uri: "/super-awesome-image.jpg" }}
    />
  );
  output.simulate("layout", { nativeEvent: { layout: { width: 100 } } });
  expect(output.state("height")).toEqual(50);
  expect(output).toMatchSnapshot();
});
