// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import { lightishGreyColor } from "../constants/colors";

const SectionDivider = () => <View style={styles.sectionDivider} />;

const styles = StyleSheet.create({
  sectionDivider: {
    backgroundColor: lightishGreyColor,
    height: 1
  }
});

export default SectionDivider;
