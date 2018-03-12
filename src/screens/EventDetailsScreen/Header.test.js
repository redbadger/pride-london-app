// @flow
import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";

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

  const touchable = output.find("TouchableOpacity");
  touchable.simulate("press");

  expect(onPress).toHaveBeenCalled();
});
