// @flow
import React from "react";
import { StyleSheet } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Text from "./Text";
import Touchable from "./Touchable";
import { whiteColor } from "../constants/colors";

type Props = {
  label: string,
  onPress?: Function,
  style?: ViewStyleProp
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
