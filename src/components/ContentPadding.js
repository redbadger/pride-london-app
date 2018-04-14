// @flow
import React from "react";
import { View, Dimensions } from "react-native";
import type { Node } from "react";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type Props = {
  children: Node,
  style?: StyleObj
};

const ContentPadding = ({ children, style }: Props) => {
  const { width } = Dimensions.get("window");
  const usePadding = width <= 440;
  const defaultStyle = usePadding
    ? { paddingHorizontal: width >= 360 ? 16 : 8 }
    : {};

  return <View style={[defaultStyle, style]}>{children}</View>;
};

ContentPadding.defaultProps = {
  style: {}
};

export default ContentPadding;
