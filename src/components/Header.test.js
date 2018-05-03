// @flow
import React from "react";
import { shallow } from "enzyme";
import { Text } from "react-native";
import Header from "./Header";

it("renders correctly with default props", () => {
  const output = shallow(<Header />);
  expect(output).toMatchSnapshot();
});

it("renders correctly with all props", () => {
  const output = shallow(
    <Header
      onBack={() => {}}
      title="Center"
      rightElement={<Text>Right</Text>}
    />
  );
  expect(output).toMatchSnapshot();
});

it("renders correctly with only title", () => {
  const output = shallow(<Header title="Center" />);
  expect(output).toMatchSnapshot();
});

it("renders correctly with only onBack and rightElement", () => {
  const output = shallow(
    <Header onBack={() => {}} rightElement={<Text>Right</Text>} />
  );
  expect(output).toMatchSnapshot();
});
