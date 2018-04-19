// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "./Text";
import { eucalyptusGreenColor } from "../constants/colors";
import type { TextType } from "./Text";

type Props = {
  children: string,
  type?: TextType
};

const TextLink = ({ children, type }: Props) => (
  <View style={styles.detailTitleLink}>
    <Text type={type} color="blue">
      {children}
    </Text>
  </View>
);

TextLink.defaultProps = {
  type: "h4"
};

const styles = StyleSheet.create({
  detailTitleLink: {
    borderBottomColor: eucalyptusGreenColor,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    alignSelf: "flex-start",
    marginBottom: 2
  }
});

export default TextLink;
