// @flow
import React from "react";
import type { ChildrenArray, Element } from "react";
import { View, StyleSheet } from "react-native";
import LayoutColumn from "../../components/LayoutColumn";
import IconItem from "./IconItem";

type IconListProps = {|
  children: ChildrenArray<Element<typeof IconItem>>
|};

const IconList = ({ children }: IconListProps) => (
  <View style={styles.container}>
    <LayoutColumn spacing={4}>{children}</LayoutColumn>
  </View>
);

// Note: marginVertical are to accomodate touchables within IconItem.
const styles = StyleSheet.create({
  container: {
    marginVertical: -6
  }
});

export default IconList;
