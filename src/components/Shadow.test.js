// @flow
import React from "react";
import { shallow } from "enzyme";
import { StyleSheet, View } from "react-native";
import Shadow from "./Shadow";

it("renders correctly", () => {
  const styles = StyleSheet.create({
    style: { width: 50, height: 50 }
  });
  const output = shallow(
    <Shadow>
      <View style={styles.style} />
    </Shadow>
  );
  expect(output).toMatchSnapshot();
});
