// @flow
import React from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { makeSelectable } from "react-native-accessible-selectable";
import type { TouchableProps } from "./TouchableTypes";
import { TouchableDefaultProps } from "./TouchableTypes";

const SelectableTouchableNativeFeedback = makeSelectable(
  TouchableNativeFeedback
);

const createTouchable = BaseTouchable => {
  const Touchable = ({
    children,
    style,
    onPress,
    disabled,
    ...props
  }: TouchableProps) => (
    <BaseTouchable
      background={TouchableNativeFeedback.SelectableBackground()}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <View style={[styles.defaults, style]}>{children}</View>
    </BaseTouchable>
  );

  Touchable.defaultProps = {
    ...TouchableDefaultProps
  };

  return Touchable;
};

const styles = StyleSheet.create({
  defaults: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: "center"
  }
});

const Touchable = createTouchable(TouchableNativeFeedback);
const SelectableTouchable = createTouchable(SelectableTouchableNativeFeedback);

export default Touchable;
export { SelectableTouchable };
