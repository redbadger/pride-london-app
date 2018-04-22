// @flow
import React from "react";
import { StyleSheet } from "react-native";
import type { DangerouslyImpreciseStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Text from "./Text";
import Touchable from "./Touchable";
import { filterButtonTextColor } from "../constants/colors";

type Props = {
  text: string,
  label: string,
  onPress: Function,
  onRef?: Function,
  style?: DangerouslyImpreciseStyleProp
};

const FilterHeaderButton = ({ text, label, onPress, onRef, style }: Props) => (
  <Touchable
    style={[styles.button, style]}
    onPress={onPress}
    ref={onRef}
    accessibilityLabel={label}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </Touchable>
);

FilterHeaderButton.defaultProps = {
  onRef: undefined,
  style: {}
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: filterButtonTextColor,
    fontFamily: "Roboto-Medium"
  }
});

export default FilterHeaderButton;
