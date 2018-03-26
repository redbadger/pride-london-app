// @flow
import React from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import type { TouchableProps } from "./TouchableTypes";
import { TouchableDefaultProps } from "./TouchableTypes";

const Touchable = ({ children, style, ...props }: TouchableProps) => (
  <TouchableNativeFeedback
    background={TouchableNativeFeedback.SelectableBackground()}
    {...props}
  >
    <View style={[styles.default, style]}>{children}</View>
  </TouchableNativeFeedback>
);

Touchable.defaultProps = {
  ...TouchableDefaultProps
};

const styles = StyleSheet.create({
  default: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: "center"
  }
});

export default Touchable;
