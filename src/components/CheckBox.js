// @flow
import React from "react";
import { Image, StyleSheet } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Text from "./Text";
import Touchable from "./Touchable";
import { checkboxAccessibilityLabel } from "../data/accessibility";

import checkboxUrl from "../../assets/images/checkBox.png";
import checkBoxCheckedUrl from "../../assets/images/checkBoxChecked.png";

type Props = {
  checked: boolean,
  label: string,
  onChange: Function,
  style?: ViewStyleProp
};

const CheckBox = ({ checked, label, onChange, style }: Props) => (
  <Touchable
    accessibilityComponentType="none"
    accessibilityTraits={["none"]}
    accessibilityLabel={checkboxAccessibilityLabel(label, checked)}
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
