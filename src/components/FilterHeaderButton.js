// @flow
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Text from "./Text";
import {
  filterButtonBorderColor,
  filterButtonTextColor
} from "../constants/colors";

type Props = {
  text: string,
  onPress: Function,
  onRef?: Function,
  style?: StyleObj
};

const FilterHeaderButton = ({ text, onPress, onRef, style }: Props) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={onPress}
    ref={onRef}
  >
    <Text type="text" style={styles.buttonText}>
      {text}
    </Text>
  </TouchableOpacity>
);

FilterHeaderButton.defaultProps = {
  onRef: undefined,
  style: {}
};

const styles = StyleSheet.create({
  button: {
    height: 32,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: filterButtonBorderColor,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: filterButtonTextColor
  }
});

export default FilterHeaderButton;
