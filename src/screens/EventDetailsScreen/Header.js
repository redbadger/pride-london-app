// @flow
import React from "react";
import type { Node } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { darkBlueGreyTwoColor } from "../../constants/colors";

type Props = {
  children: Node
};

const Header = ({ children }: Props) => (
  <View accessibilityTraits={["header"]} style={styles.header}>
    <SafeAreaView>
      <StatusBar barStyle="light-content" animated />
      {children}
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: darkBlueGreyTwoColor
  }
});

export default Header;
