// @flow
import React from "react";
import { Text as RnText, StyleSheet } from "react-native";
import Markdown from "react-native-easy-markdown";
import type { Node } from "react";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export type TextType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "text"
  | "small"
  | "xSmall";

type Props = {
  children: Node,
  type?: TextType,
  markdown?: boolean,
  style?: StyleObj
};

const Text = ({ children, type, markdown, style }: Props) =>
  markdown ? (
    <Markdown
      style={style}
      markdownStyles={{ ...textStyles, ...markdownStyles }}
    >
      {children}
    </Markdown>
  ) : (
    <RnText style={[type && styles[type], style]}>{children}</RnText>
  );
Text.defaultProps = {
  type: "text",
  markdown: false,
  style: {}
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
    lineHeight: 24,
    includeFontPadding: false
  },
  h4: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 24
  },
  h5: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 24
  },
  h6: {
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
    fontSize: 12,
    lineHeight: 16
  }
};

const markdownStyles = {
  // "u" - underline is listed in react-native-easy-markdown
  // but doesn't exist in the markdown spec so should be rendered bold
  u: {
    fontWeight: "bold"
  }
};

const styles = StyleSheet.create(textStyles);

export default Text;
