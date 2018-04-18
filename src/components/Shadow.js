// @flow
import React from "react";
import type { Node } from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { transparent, shadowColor } from "../constants/colors";

type Props = {
  children: Node
};

const Shadow = ({ children }: Props) => (
  <View style={styles.shadowContainer}>
    {children}
    <LinearGradient
      pointerEvents="none"
      colors={[transparent, shadowColor]}
      style={styles.shadow}
    />
  </View>
);

const styles = StyleSheet.create({
  shadowContainer: {
    display: "flex"
  },
  shadow: {
    width: "100%",
    height: 14,
    position: "absolute",
    left: 0,
    top: -14
  }
});

export default Shadow;
