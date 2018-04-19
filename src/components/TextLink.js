// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Text from "./Text";
import { eucalyptusGreenColor } from "../constants/colors";
import Touchable from "../components/Touchable";
import type { TextType } from "./Text";

type Props = {
  children: string,
  onPress: Function,
  style?: StyleObj,
  type?: TextType
};

const TextLink = ({ children, onPress, style, type }: Props) => (
  <Touchable onPress={onPress} style={style}>
    <View style={styles.detailTitleLink}>
      <Text type={type} color="blue">
        {children}
      </Text>
    </View>
  </Touchable>
);

TextLink.defaultProps = {
  type: "h4",
  style: {}
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
