// @flow
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Text from "./Text";

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

const filterBorderColor = "#FFF";
const filterColor = "#FFF";

const styles = StyleSheet.create({
  button: {
    height: 32,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: filterBorderColor,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: filterColor
  }
});

export default FilterHeaderButton;
