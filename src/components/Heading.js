// @flow
import React from "react";
import { Text, StyleSheet } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type Props = {
  text: string,
  level?: number,
  style?: StyleObj
};

const Heading = ({ text, level = 1, style }: Props) => (
  <Text style={[styles.heading, styles[`h${level}`], style]}>{text}</Text>
);
Heading.defaultProps = {
  level: 1,
  style: {}
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Roboto"
  },
  /* eslint-disable react-native/no-unused-styles */
  h1: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    lineHeight: 28
  },
  h2: {
    fontSize: 18,
    lineHeight: 24
  },
  h3: {
    fontSize: 16,
    lineHeight: 24
  }
  /* eslint-enable */
});
