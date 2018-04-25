// @flow
import React from "react";
import { StyleSheet } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Text from "./Text";
import Touchable from "./Touchable";
import { whiteColor } from "../constants/colors";

type Props = {
  label: string,
  onPress?: Function,
  style?: StyleObj
};

const ActionButton = ({ label, onPress, style }: Props) => (
  <Touchable onPress={onPress} style={style}>
    <Text type="h4" style={styles.text}>
      {label}
    </Text>
  </Touchable>
);
ActionButton.defaultProps = {
  onPress: () => {},
  style: {}
};

const styles = StyleSheet.create({
  text: {
    color: whiteColor
  }
});

export default ActionButton;
