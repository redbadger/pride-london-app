// @flow
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import type { TouchableProps } from "./TouchableTypes";
import { TouchableDefaultProps } from "./TouchableTypes";

const Touchable = ({ children, style, ...props }: TouchableProps) => (
  <TouchableOpacity style={[styles.default, style]} {...props}>
    {children}
  </TouchableOpacity>
);

Touchable.defaultProps = {
  ...TouchableDefaultProps,
  delayPressIn: 50
};

const styles = StyleSheet.create({
  default: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: "center"
  }
});

export default Touchable;
