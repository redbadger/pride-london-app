// @flow
import React from "react";
import { Text as RnText, StyleSheet } from "react-native";
import Markdown from "react-native-easy-markdown";
import type { TextProps } from "react-native/Libraries/Text/TextProps";
import { mergeDeepRight } from "ramda";
import { blackColor, lightNavyBlueColor } from "../constants/colors";

export type TextType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "text"
  | "small"
  | "xSmall"
  | "price";

export type ColorType = "lightNavyBlueColor" | "blackColor";

type Props = {
  type?: TextType,
  color?: ColorType,
  markdown?: boolean,
  ...TextProps
};

const Text = ({
  children,
  onLayout,
  type,
  markdown,
  style,
  color,
  allowFontScaling,
  ...otherProps
}: Props) =>
  markdown ? (
    <Markdown
      style={style}
      markdownStyles={mergeDeepRight(textStyles, markdownStyles)}
      onLayout={onLayout}
      {...otherProps}
    >
      {String(children).trim()}
    </Markdown>
  ) : (
    <RnText
      style={[type && styles[type], color && styles[color], style]}
      onLayout={onLayout}
      allowFontScaling={allowFontScaling}
      {...otherProps}
    >
      {children}
    </RnText>
  );

Text.defaultProps = {
  type: "text",
  markdown: false,
  color: "blackColor"
};

const textStyles = {
  h1: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    lineHeight: 28,
    includeFontPadding: false
  },
  h2: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    lineHeight: 24,
    includeFontPadding: false
  },
  h3: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    lineHeight: 20,
    includeFontPadding: false
  },
  h4: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 24
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 24
  },
  small: {
    fontFamily: "Roboto",
    fontSize: 14,
    lineHeight: 20
  },
  xSmall: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    lineHeight: 16,
    includeFontPadding: false
  },
  price: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    lineHeight: 20
  },
  blackColor: {
    color: blackColor
  },
  lightNavyBlueColor: {
    color: lightNavyBlueColor
  }
};

const markdownStyles = {
  // "u" - underline is listed in react-native-easy-markdown
  // but doesn't exist in the markdown spec so should be rendered bold
  u: {
    fontWeight: "bold"
  },
  text: {
    color: blackColor
  }
};

const styles = StyleSheet.create(textStyles);

export default Text;
