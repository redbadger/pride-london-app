// @flow
import React from "react";
import { View, Dimensions } from "react-native";
import type { Node } from "react";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type ScreenSize = "small" | "medium" | "large";

type Padding = {
  horizontal: number,
  vertical: number
};

type Props = {
  children: Node,
  padding?: { [ScreenSize]: Padding },
  style?: StyleObj
};

const getScreenSize = (): ScreenSize => {
  const { width } = Dimensions.get("window");
  if (width >= 440) {
    return "large";
  } else if (width >= 360) {
    return "medium";
  }

  return "small";
};

const defaultPadding = {
  small: { horizontal: 8, vertical: 0 },
  medium: { horizontal: 16, vertical: 0 },
  large: { horizontal: 0, vertical: 0 }
};

const ContentPadding = ({ children, padding, style }: Props) => {
  const size = getScreenSize();
  const selectedPadding = (padding || {})[size] || defaultPadding[size];
  const defaultStyle = {
    paddingHorizontal: selectedPadding.horizontal,
    paddingVertical: selectedPadding.vertical
  };

  return <View style={[defaultStyle, style]}>{children}</View>;
};

ContentPadding.defaultProps = {
  padding: {},
  style: {}
};

export default ContentPadding;
