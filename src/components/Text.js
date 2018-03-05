// @flow
import React from "react";
import { Text as RnText, StyleSheet } from "react-native";
import Markdown from "react-native-easy-markdown";
import type { Node } from "react";

type Props = {
  children: Node,
  type?: "small" | "xSmall",
  markdown?: boolean
};

const Text = ({ children, type, markdown }: Props) =>
  markdown ? (
    <Markdown markdownStyles={textStyles}>{children}</Markdown>
  ) : (
    <RnText style={[styles.text, type && styles[type]]}>{children}</RnText>
  );
Text.defaultProps = {
  type: undefined,
  markdown: false
};

const textStyles = {
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 24
  },
  /* eslint-disable react-native/no-unused-styles */
  small: {
    fontSize: 14,
    lineHeight: 20
  },
  xSmall: {
    fontSize: 12,
    lineHeight: 16
  }
  /* eslint-enable */
};

const styles = StyleSheet.create(textStyles);

export default Text;
