// @flow
import React from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import type { TouchableProps } from "./TouchableTypes";
import { TouchableDefaultProps } from "./TouchableTypes";

const Touchable = ({
  children,
  style,
  onPress,
  disabled,
  ...props
}: TouchableProps) => (
  <TouchableNativeFeedback
    accessibilityTraits={["button"]}
    accessibilityComponentType="button"
    background={TouchableNativeFeedback.SelectableBackground()}
    onPress={onPress}
    disabled={disabled}
  >
    <View style={[styles.defaults, style]} {...props}>
      {children}
    </View>
  </TouchableNativeFeedback>
);

Touchable.defaultProps = {
  ...TouchableDefaultProps
};

const styles = StyleSheet.create({
  defaults: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: "center"
  }
});

export default Touchable;
