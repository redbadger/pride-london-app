// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { Node } from "react";

type IconItemProps = {|
  icon: Node,
  children: Node
|};

const IconItem = ({ icon, children }: IconItemProps) => (
  <View style={styles.iconItem}>
    <View style={styles.icon}>{icon}</View>
    <View style={styles.item}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  iconItem: {
    flex: 1,
    flexDirection: "row"
  },
  icon: {
    width: 40,
    height: 32,
    marginRight: 12
  },
  item: {
    flex: 1,
    paddingTop: 2
  }
});

export default IconItem;
