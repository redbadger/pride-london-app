// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { Node } from "react";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import Text from "../../components/Text";
import type { TextType } from "../../components/Text";
import { lightNavyBlueColor } from "../../constants/colors";

type IconItemProps = {|
  icon: Node,
  title: string,
  content?: Node,
  titleType?: TextType,
  textStyle?: StyleObj
|};

const IconItem = ({
  icon,
  title,
  titleType,
  content,
  textStyle
}: IconItemProps) => (
  <View style={styles.iconItem}>
    <View style={styles.icon}>{icon}</View>
    <View style={styles.item}>
      <Text type={titleType} style={[styles.title, textStyle]}>
        {title}
      </Text>
      {content}
    </View>
  </View>
);
IconItem.defaultProps = {
  content: null,
  titleType: "h4",
  textStyle: {}
};

const styles = StyleSheet.create({
  iconItem: {
    flex: 1,
    flexDirection: "row"
  },
  icon: {
    width: 40,
    height: 20,
    marginRight: 18
  },
  item: {
    flex: 1
  },
  title: {
    color: lightNavyBlueColor
  }
});

export default IconItem;
