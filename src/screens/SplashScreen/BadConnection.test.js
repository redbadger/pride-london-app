// @flow
import React from "react";
import { ActivityIndicator } from "react-native";
import { shallow } from "enzyme";
import BadConnection from "./BadConnection";
import Button from "../../components/ButtonPrimary";

it("renders correctly when showing", () => {
  const output = shallow(
    <BadConnection getData={() => {}} noDataReceived={false} loading={false} />
  );

  expect(output).toMatchSnapshot();
});

it("renders correctly when with no data", () => {
  const output = shallow(
    <BadConnection getData={() => {}} noDataReceived loading={false} />
  );

  expect(output).toMatchSnapshot();
});

it("renders correctly when with no data and loading", () => {
  const output = shallow(
    <BadConnection getData={() => {}} noDataReceived loading />
  );

  expect(output).toMatchSnapshot();
});

describe("Retrying", () => {
  it("Calls getData when retry button is pressed", () => {
    const mock = jest.fn();
    const output = shallow(
      <BadConnection getData={mock} noDataReceived loading={false} />
    );

    const button = output.find(Button);
    button.props().onPress();
    expect(mock).toHaveBeenCalled();
  });

  it("Sets retrying state and renders spinner when retry button is pressed", () => {
    const mock = jest.fn();
    const output = shallow(
      <BadConnection getData={mock} noDataReceived loading={false} />
    );

    const button = output.find(Button);
    button.props().onPress();
    output.update();
    expect(output.state().retrying).toEqual(true);
    expect(output.find(ActivityIndicator).exists()).toEqual(true);
    expect(output.find(Button).exists()).toEqual(false);
  });
});
