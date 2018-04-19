// @flow
import React from "react";
import { phonecall, email } from "react-native-communications";
import { shallow } from "enzyme";
import ContactDetails from "./ContactDetails";
import Touchable from "../../components/Touchable";
import text from "../../constants/text";

jest.mock("react-native-communications", () => ({
  phonecall: jest.fn(() => {}),
  email: jest.fn(() => {})
}));

beforeEach(() => {
  phonecall.mockClear();
  email.mockClear();
});

it("renders correctly", () => {
  const output = shallow(
    <ContactDetails email="milo@red-badger.com" phone="1-800-555-WOOF" />
  );
  expect(output).toMatchSnapshot();
});

it("calls the phone number on tap", () => {
  const output = shallow(
    <ContactDetails email="milo@red-badger.com" phone="1-800-555-WOOF" />
  );

  output
    .find(Touchable)
    .last()
    .simulate("press");
  expect(phonecall).toBeCalledWith("1-800-555-WOOF", false);
});

it("opens the configured email app on tap", () => {
  const output = shallow(
    <ContactDetails email="milo@red-badger.com" phone="1-800-555-WOOF" />
  );

  output
    .find(Touchable)
    .first()
    .simulate("press");
  expect(email).toBeCalledWith(
    ["milo@red-badger.com"],
    null,
    null,
    text.eventDetailsContactEmailSubject,
    text.eventeventDetailsContactEmailBody
  );
});
