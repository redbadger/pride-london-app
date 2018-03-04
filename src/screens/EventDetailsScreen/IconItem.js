// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { Node } from "react";
import Heading from "../../components/Heading";

type IconItemProps = {
  icon: Node,
  title: string,
  children?: Node
};

const IconItem = ({ icon, title, children }: IconItemProps) => (
  <View style={styles.iconItem}>
    <View style={styles.icon}>{icon}</View>
    <View style={styles.item}>
      <Heading level={3} text={title} />
      {children}
    </View>
  </View>
);
IconItem.defaultProps = {
  children: null
};

const styles = StyleSheet.create({
  iconItem: {
    flex: 1,
    flexDirection: "row"
  },
  icon: {
    width: 40,
    height: 20,
    paddingRight: 20
  },
  item: {
    flex: 1
  }
});

export default IconItem;
