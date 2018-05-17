// @flow
import React from "react";
import { Image, StyleSheet, Platform } from "react-native";
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

const getAccessibilityLabel = (label: string, checked: boolean) =>
  Platform.select({
    ios: checked ? `${label}, checkbox, selected` : `${label}, checkbox, empty`,
    android: checked
      ? `checked checkbox, ${label}`
      : `not checked checkbox, ${label}`
  });

const CheckBox = ({ checked, label, onChange, style }: Props) => (
  <Touchable
    accessibilityComponentType="none"
    accessibilityTraits="none"
    accessibilityLabel={getAccessibilityLabel(label, checked)}
    onPress={onChange}
    style={[styles.container, style]}
  >
    <Text style={styles.text}>{label}</Text>
    <Image source={checked ? checkBoxCheckedUrl : checkboxUrl} />
  </Touchable>
);

CheckBox.defaultProps = {
  style: {}
};

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
