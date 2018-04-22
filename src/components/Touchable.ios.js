// @flow
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import type { TouchableProps } from "./TouchableTypes";
import { TouchableDefaultProps } from "./TouchableTypes";

const Touchable = ({ children, style, ...props }: TouchableProps) => {
  const accessibilityTraits =
    props.accessibilityTraits ||
    (props.disabled ? ["button", "disabled"] : ["button"]);
  return (
    <TouchableOpacity
      style={[styles.defaults, style]}
      {...props}
      accessibilityTraits={accessibilityTraits}
    >
      {children}
    </TouchableOpacity>
  );
};

Touchable.defaultProps = {
  ...TouchableDefaultProps,
  delayPressIn: 50
};

const styles = StyleSheet.create({
  defaults: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: "center"
  }
});

export default Touchable;
