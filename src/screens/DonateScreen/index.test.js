// @flow
import React from "react";
import { Keyboard, Linking } from "react-native";
import { shallow } from "enzyme";
import DonateScreen from ".";
import Button from "../../components/ButtonPrimary";
import Header from "../../components/Header";
import NumberTextField from "./NumberTextField";
import SegmentedControl from "./SegmentedControl";

let openURLSpy;
let addKeyboardListenerSpy;
let removeKeyboardListenerSpy;
beforeEach(() => {
  openURLSpy = jest
    .spyOn(Linking, "openURL")
    .mockImplementation(() => Promise.resolve());
  addKeyboardListenerSpy = jest.spyOn(Keyboard, "addListener");
  removeKeyboardListenerSpy = jest.spyOn(Keyboard, "removeListener");
});

it("renders correctly", () => {
  const output = shallow(<DonateScreen navigation={null} />);
  expect(output).toMatchSnapshot();
});

it("sets selected and clears other amound when using the amount selector", () => {
  const output = shallow(<DonateScreen navigation={null} />);
  const amountSelector = output.find(SegmentedControl);

  output.setState({ otherAmount: "20" });
  amountSelector.prop("onValueChange")(10);
  expect(output.state()).toEqual({
    otherAmount: null,
    selectedAmount: 10
  });
});

it("clears selected amount when focusing the other amount input", () => {
  const output = shallow(<DonateScreen navigation={null} />);
  const otherAmount = output.find(NumberTextField);

  output.setState({ selectedAmount: 10 });
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
  output.setState({ selectedAmount: 10 });
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
  const header = output.find(Header).shallow();
  const backButton = header.find(Header.BackButton).shallow();
  const backFn = backButton.prop("onPress");
  backFn();
  expect(navigation.goBack).toHaveBeenCalledWith(null);
});

it("scrolls down to reveal Donate button when keyboard shows", () => {
  const output = shallow(<DonateScreen navigation={null} />);
  const scrollToEnd = jest.fn();
  output.instance().scrollViewRef.current = { scrollToEnd };

  expect(addKeyboardListenerSpy).toHaveBeenCalledWith(
    "keyboardDidShow",
    expect.any(Function)
  );

  const listener = addKeyboardListenerSpy.mock.calls[0][1];
  listener();
  expect(scrollToEnd).toHaveBeenCalled();

  output.unmount();
  expect(removeKeyboardListenerSpy).toHaveBeenCalledWith(
    "keyboardDidShow",
    listener
  );
});

afterEach(() => {
  openURLSpy.mockRestore();
  addKeyboardListenerSpy.mockRestore();
  removeKeyboardListenerSpy.mockRestore();
});
