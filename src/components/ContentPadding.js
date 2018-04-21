// @flow
import React from "react";
import type { Node } from "react";
import { View } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import ScreenSizeProvider from "./ScreenSizeProvider";
import type { ScreenSize } from "./ScreenSizeProvider";

type Padding = {
  horizontal: number,
  vertical: number
};

type PaddingOption = { [ScreenSize]: Padding };

type Props = {
  children: Node,
  padding?: PaddingOption,
  style?: StyleObj
};

const defaultPadding = {
  small: { horizontal: 8, vertical: 0 },
  medium: { horizontal: 16, vertical: 0 },
  large: { horizontal: 0, vertical: 0 }
};

const getPaddingStyle = (size: ScreenSize, padding?: PaddingOption) => {
  const selectedPadding = (padding || {})[size] || defaultPadding[size];
  return {
    paddingHorizontal: selectedPadding.horizontal,
    paddingVertical: selectedPadding.vertical
  };
};

const ContentPadding = ({ children, padding, style }: Props) => (
  <ScreenSizeProvider>
    {size => (
      <View style={[getPaddingStyle(size, padding), style]}>{children}</View>
    )}
  </ScreenSizeProvider>
);

ContentPadding.defaultProps = {
  padding: {},
  style: {}
};

export const getContentPadding = getPaddingStyle;
export default ContentPadding;
