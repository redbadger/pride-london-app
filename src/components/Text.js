// @flow
import React from "react";
import { Text as RnText, StyleSheet } from "react-native";
import Markdown from "react-native-easy-markdown";
import type { Node } from "react";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type Props = {
  children: Node,
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "text" | "small" | "xSmall",
  markdown?: boolean,
  style?: StyleObj
};

const Text = ({ children, type, markdown, style }: Props) =>
  markdown ? (
    <Markdown style={style} markdownStyles={textStyles}>
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
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 24
  },
  /* eslint-disable react-native/no-unused-styles */
  h1: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    lineHeight: 28
  },
  h2: {
    fontFamily: "Roboto",
    fontSize: 18,
    lineHeight: 24
  },
  h3: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 24
  },
  h4: {},
  h5: {},
  h6: {},
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
  /* eslint-enable */
};

const styles = StyleSheet.create(textStyles);

export default Text;
