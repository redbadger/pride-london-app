// @flow
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { makeSelectable } from "react-native-accessible-selectable";
import type { TouchableProps } from "./TouchableTypes";
import { TouchableDefaultProps } from "./TouchableTypes";

const SelectableTouchableOpacity = makeSelectable(TouchableOpacity);

const createTouchable = BaseTouchable => {
  const Touchable = ({ children, style, ...props }: TouchableProps) => {
    const accessibilityTraits =
      props.accessibilityTraits ||
      (props.disabled ? ["button", "disabled"] : ["button"]);
    return (
      <BaseTouchable
        style={[styles.defaults, style]}
        {...props}
        accessibilityTraits={accessibilityTraits}
      >
        {children}
      </BaseTouchable>
    );
  };

  Touchable.defaultProps = {
    ...TouchableDefaultProps,
    delayPressIn: 50
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

const Touchable = createTouchable(TouchableOpacity);
const SelectableTouchable = createTouchable(SelectableTouchableOpacity);

export default Touchable;
export { SelectableTouchable };
