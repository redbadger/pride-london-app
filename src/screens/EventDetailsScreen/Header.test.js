// @flow
import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";
import Touchable from "../../components/Touchable";

it("renders correctly", () => {
  const output = shallow(
    <Header onBackButtonPress={() => {}} imageUrl="https://image.jpg" />
  );
  expect(output).toMatchSnapshot();
});

it("calls callback when pressed", () => {
  const onPress = jest.fn();
  const output = shallow(
    <Header onBackButtonPress={onPress} imageUrl="https://image.jpg" />
  );

  const touchable = output.find(Touchable);
  touchable.simulate("press");

  expect(onPress).toHaveBeenCalled();
});
