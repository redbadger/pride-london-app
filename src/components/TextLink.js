// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";
import { eucalyptusGreenColor } from "../constants/colors";

type Props = {
  children: string
};

// Note: No touch functionality here. Instead expect to be wrapped in a
// touchable. This was due to the rouch target sizing, and the fact that
// often you want to have this and other siblings to be touchable.
const TextLink = ({ children }: Props) => (
  <View style={styles.link}>
    <Text type="h4" color="lightNavyBlueColor">
      {children}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  link: {
    borderBottomColor: eucalyptusGreenColor,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    alignSelf: "flex-start",
    marginBottom: 2
  }
});

export default TextLink;
