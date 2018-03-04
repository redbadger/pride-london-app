// @flow
import React from "react";
import { Text as RnText, StyleSheet } from "react-native";
import type { Node } from "react";

type Props = {
  children: Node,
  type?: "para" | "small" | "xSmall"
};

const Text = ({ children, type }: Props) => (
  <RnText style={[styles.text, type && styles[type]]}>{children}</RnText>
);
Text.defaultProps = {
  type: "para"
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto"
  },
  /* eslint-disable react-native/no-unused-styles */
  para: {
    fontSize: 16,
    lineHeight: 24
  },
  small: {
    fontSize: 14,
    lineHeight: 20
  },
  xSmall: {
    fontSize: 12,
    lineHeight: 16
  }
  /* eslint-enable */
});

export default Text;
