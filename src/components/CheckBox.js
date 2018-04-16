// @flow
import React from "react";
import { Image, StyleSheet } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Text from "./Text";
import Touchable from "./Touchable";

import checkboxUrl from "./check-box.png";
import checkBoxCheckedUrl from "./check-box-checked.png";

type Props = {
  checked: boolean,
  label: string,
  onChange: Function,
  style?: StyleObj
};

const CheckBox = ({ checked, label, onChange, style }: Props) => (
  <Touchable
    accessibilityComponentType={
      checked ? "radiobutton_checked" : "radiobutton_unchecked"
    }
    accessibilityTraits={checked ? ["button", "selected"] : ["button"]}
    onPress={onChange}
    style={[styles.container, style]}
  >
    <Text>{label}</Text>
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
  }
});

export default CheckBox;
