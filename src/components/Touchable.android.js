// @flow
import React from "react";
import {
  findNodeHandle,
  StyleSheet,
  TouchableNativeFeedback,
  UIManager,
  View
} from "react-native";
import type { TouchableProps } from "./TouchableTypes";
import { TouchableDefaultProps } from "./TouchableTypes";

class Touchable extends React.PureComponent<TouchableProps> {
  static defaultProps = {
    ...TouchableDefaultProps
  };

  componentDidUpdate(prevProps: TouchableProps) {
    // Notify user, that the radio button changed to checked state.
    if (
      this.props.accessibilityComponentType === "radiobutton_checked" &&
      this.props.accessibilityComponentType !==
        prevProps.accessibilityComponentType
    ) {
      UIManager.sendAccessibilityEvent(
        findNodeHandle(this),
        UIManager.AccessibilityEventTypes.typeViewClicked
      );
    }
  }

  render() {
    const { children, style, onPress, disabled, ...props } = this.props;

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={onPress}
        disabled={disabled}
        {...props}
      >
        <View style={[styles.defaults, style]}>{children}</View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  defaults: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: "center"
  }
});

export default Touchable;
