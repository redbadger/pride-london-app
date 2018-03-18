// @flow
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Text from "./Text";

import checkBoxCheckedUrl from "./check-box-checked.png";

type Props = {
  checked: boolean,
  label: string,
  onChange: Function,
  style?: StyleObj
};

const CheckBox = ({ checked, label, onChange, style }: Props) => (
  <TouchableOpacity
    accessibilityComponentType={
      checked ? "radiobutton_checked" : "radiobutton_unchecked"
    }
    accessibilityTraits={checked ? ["button", "selected"] : ["button"]}
    onPress={onChange}
    style={[styles.container, style]}
  >
    <Text>{label}</Text>
    {checked && <Image source={checkBoxCheckedUrl} />}
  </TouchableOpacity>
);

CheckBox.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default CheckBox;
