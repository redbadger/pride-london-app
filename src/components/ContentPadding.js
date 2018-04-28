// @flow
import React from "react";
import type { Node } from "react";
import { View } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
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
  style?: ViewStyleProp
};

const defaultPadding = {
  small: { horizontal: 8, vertical: 0 },
  medium: { horizontal: 16, vertical: 0 },
  large: { horizontal: 0, vertical: 0 }
};

const paddingStyle = (size: ScreenSize, padding?: PaddingOption) => {
  const selectedPadding = (padding || {})[size] || defaultPadding[size];
  return {
    paddingHorizontal: selectedPadding.horizontal,
    paddingVertical: selectedPadding.vertical
  };
};

const ContentPadding = ({ children, padding, style }: Props) => (
  <ScreenSizeProvider>
    {size => (
      <View style={[paddingStyle(size, padding), style]}>{children}</View>
    )}
  </ScreenSizeProvider>
);

ContentPadding.defaultProps = {
  padding: {},
  style: {}
};

export const getContentPadding = paddingStyle;
export default ContentPadding;
