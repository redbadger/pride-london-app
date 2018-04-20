// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { Node } from "react";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type IconItemProps = {|
  icon: Node,
  children: Node,
  style?: StyleObj
|};

const IconItem = ({ icon, children, style }: IconItemProps) => (
  <View style={[styles.iconItem, style]}>
    <View style={styles.icon}>{icon}</View>
    <View style={styles.item}>{children}</View>
  </View>
);
IconItem.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  iconItem: {
    flex: 1,
    flexDirection: "row"
  },
  icon: {
    width: 40,
    height: 20,
    marginRight: 12
  },
  item: {
    flex: 1
  }
});

export default IconItem;
