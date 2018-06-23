// @flow
import React from "react";
import { findNodeHandle, Image, StyleSheet, UIManager } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Text from "./Text";
import Touchable from "./Touchable";

import checkboxUrl from "../../assets/images/checkBox.png";
import checkBoxCheckedUrl from "../../assets/images/checkBoxChecked.png";

type Props = {
  checked: boolean,
  label: string,
  onChange: Function,
  style?: ViewStyleProp
};

class CheckBox extends React.PureComponent<Props> {
  static defaultProps = {
    style: {}
  };

  componentDidUpdate(prevProps: Props) {
    // Notify user, that the radio button changed to checked state.
    if (this.props.checked && !prevProps.checked) {
      UIManager.sendAccessibilityEvent(
        findNodeHandle(this),
        UIManager.AccessibilityEventTypes.typeViewClicked
      );
    }
  }

  render() {
    const { checked, label, onChange, style } = this.props;

    return (
      <Touchable
        accessibilityComponentType={
          checked ? "radiobutton_checked" : "radiobutton_unchecked"
        }
        accessibilityTraits={checked ? ["selected", "button"] : ["button"]}
        onPress={onChange}
        style={[styles.container, style]}
      >
        <Text style={styles.text}>{label}</Text>
        <Image source={checked ? checkBoxCheckedUrl : checkboxUrl} />
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
