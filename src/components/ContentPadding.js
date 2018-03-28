// @flow
import React from "react";
import { View, Dimensions } from "react-native";
import type { Node } from "react";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type Props = {
  children: Node,
  style?: StyleObj
};

export const calculateHorizontalPadding = () =>
  Dimensions.get("window").width >= 360 ? 16 : 8;

const ContentPadding = ({ children, style }: Props) => {
  const paddingHorizontal = calculateHorizontalPadding();
  return <View style={[{ paddingHorizontal }, style]}>{children}</View>;
};
ContentPadding.defaultProps = {
  style: {}
};

export default ContentPadding;
