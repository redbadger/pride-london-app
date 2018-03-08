// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { Node } from "react";
import Text from "../../components/Text";
import type { TextType } from "../../components/Text";

type IconItemProps = {|
  icon: Node,
  title: string,
  content?: Node,
  titleType?: TextType
|};

const IconItem = ({ icon, title, titleType, content }: IconItemProps) => (
  <View style={styles.iconItem}>
    <View style={styles.icon}>{icon}</View>
    <View style={styles.item}>
      <Text type={titleType}>{title}</Text>
      {content}
    </View>
  </View>
);
IconItem.defaultProps = {
  content: null,
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
