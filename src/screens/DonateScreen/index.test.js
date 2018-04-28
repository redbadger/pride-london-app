// @flow
import React from "react";
import { Linking } from "react-native";
import { shallow } from "enzyme";
import DonateScreen from ".";
import Button from "../../components/ButtonPrimary";
import NumberTextField from "./NumberTextField";
import SegmentedControl from "./SegmentedControl";

let openURLSpy;
beforeEach(() => {
  openURLSpy = jest
    .spyOn(Linking, "openURL")
    .mockImplementation(() => Promise.resolve());
});

it("renders correctly", () => {
  const output = shallow(<DonateScreen navigation={null} />);
  expect(output).toMatchSnapshot();
});

it("sets selected and clears other amound when using the amount selector", () => {
  const output = shallow(<DonateScreen navigation={null} />);
  const amountSelector = output.find(SegmentedControl);

  output.setState({ otherAmount: "20" });
  amountSelector.prop("onSelectedIndexChange")(1);
  expect(output.state()).toEqual({
    otherAmount: null,
    selectedAmount: 1
  });
});

it("clears selected amount when focusing the other amount input", () => {
  const output = shallow(<DonateScreen navigation={null} />);
  const otherAmount = output.find(NumberTextField);

  output.setState({ selectedAmount: 1 });
  otherAmount.prop("onFocus")();
  expect(output.state()).toEqual({
    otherAmount: null,
    selectedAmount: null
  });
});

it("sets other amound when using the other amount input", () => {
  const output = shallow(<DonateScreen navigation={null} />);
  const otherAmount = output.find(NumberTextField);

  otherAmount.prop("onChangeText")("4");
  expect(output.state()).toEqual({
    otherAmount: "4",
    selectedAmount: null
  });
});

it("opens donation website with default amount when pressing donate button", () => {
  const output = shallow(<DonateScreen navigation={null} />);
  output.find(Button).simulate("press");
  expect(openURLSpy).toHaveBeenCalledWith(
    "https://donate.prideinlondon.org/?amount=0"
  );
});

it("opens donation website with selected amount when pressing donate button", () => {
  const output = shallow(<DonateScreen navigation={null} />);
  output.setState({ selectedAmount: 1 });
  output.find(Button).simulate("press");
  expect(openURLSpy).toHaveBeenCalledWith(
    "https://donate.prideinlondon.org/?amount=10"
  );
});

it("opens donation website with other amount when pressing donate button", () => {
  const output = shallow(<DonateScreen navigation={null} />);
  output.setState({ otherAmount: "0&hack=1" });
  output.find(Button).simulate("press");
  expect(openURLSpy).toHaveBeenCalledWith(
    "https://donate.prideinlondon.org/?amount=0%26hack%3D1"
  );
});

it("navigates back when user presses back button in toolbar", () => {
  const navigation = { goBack: jest.fn() };
  const output = shallow(<DonateScreen navigation={navigation} />);
  output.find({ testID: "back" }).simulate("press");
  expect(navigation.goBack).toHaveBeenCalledWith(null);
});

afterEach(() => {
  openURLSpy.mockRestore();
});
