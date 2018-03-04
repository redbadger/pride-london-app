// @flow
import React from "react";
import { Text, StyleSheet } from "react-native";

type Props = {
  text: string
};

const Heading = ({ text }: Props) => <Text style={styles.h1}>{text}</Text>;

export default Heading;

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    lineHeight: 28
  }
});
