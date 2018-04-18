// @flow
import React from "react";
import type { Node } from "react";
import { StyleSheet, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { darkBlueGreyTwoColor } from "../constants/colors";

type Props = {
  children: Node
};

const Header = ({ children }: Props) => (
  <SafeAreaView accessibilityTraits={["header"]} style={styles.header}>
    <StatusBar barStyle="light-content" animated />
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: darkBlueGreyTwoColor
  }
});

export default Header;
