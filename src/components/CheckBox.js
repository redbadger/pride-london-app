// @flow
import React from "react";
import {
  findNodeHandle,
  Platform,
  StyleSheet,
  Switch,
  UIManager
} from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Text from "./Text";
import Touchable from "./Touchable";

type Props = {
  checked: boolean,
  label: string,
  onChange: Function,
  style?: ViewStyleProp
};

class CheckBox extends React.Component<Props> {
  static defaultProps = {
    style: {}
  };

  shouldComponentUpdate(nextProps: Props) {
    return (
      this.props.label !== nextProps.label ||
      this.props.checked !== nextProps.checked
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (Platform.OS === "android") {
      // Notify user, that the radio button changed to checked state.
      if (this.props.checked && !prevProps.checked) {
        UIManager.sendAccessibilityEvent(
          findNodeHandle(this),
          UIManager.AccessibilityEventTypes.typeViewClicked
        );
      }
    }
  }

  onPress = () => {
    this.props.onChange();
  };

  render() {
    const { checked, label, style } = this.props;

    return (
      <Touchable
        accessible={false}
        onPress={this.onPress}
        style={[styles.container, style]}
      >
        <Text accessible={false} style={styles.text}>
          {label}
        </Text>
        <Switch
          accessibilityLabel={label}
          onValueChange={this.onPress}
          value={checked}
        />
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    // prevents text from pushing icon off screen
    flex: 1
  }
});

export default CheckBox;
