// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { Node } from "react";
import Text from "../../components/Text";
import type { TextType } from "../../components/Text";

type IconItemProps = {
  icon: Node,
  title: string,
  children?: Node,
  titleType?: TextType
};

const IconItem = ({ icon, title, titleType, children }: IconItemProps) => (
  <View style={styles.iconItem}>
    <View style={styles.icon}>{icon}</View>
    <View style={styles.item}>
      <Text type={titleType}>{title}</Text>
      {children}
    </View>
  </View>
);
IconItem.defaultProps = {
  children: null,
  titleType: "h3"
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
