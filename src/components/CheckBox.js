// @flow
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Text from "./Text";

import checkBoxCheckedUrl from "./check-box-checked.png";

type Props = {
  checked: boolean,
  label: string,
  onChange: Function
};

const CheckBox = ({ checked, label, onChange }: Props) => (
  <TouchableOpacity
    accessibilityComponentType={
      checked ? "radiobutton_checked" : "radiobutton_unchecked"
    }
    accessibilityTraits={checked ? ["button", "selected"] : ["button"]}
    onPress={onChange}
    style={styles.container}
  >
    <Text>{label}</Text>
    {checked && <Image source={checkBoxCheckedUrl} />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8
  }
});

export default CheckBox;
