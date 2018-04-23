// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Text from "./Text";
import eventCategories from "../constants/event-categories";
import locale from "../data/locale";
import { blackColor, whiteColor } from "../constants/colors";

const categoryStyleColor = (category: string) => {
  const categoryData = eventCategories[locale][category];
  return { color: categoryData.contrast ? blackColor : whiteColor };
};

const categoryStyleBackgroundColor = (category: string) => {
  const categoryData = eventCategories[locale][category];
  return { backgroundColor: categoryData.color };
};

type Props = {
  name: string,
  style?: ViewStyleProp
};

const CategoryPill = ({ name, style }: Props) => (
  <View
    style={[styles.categoryPill, categoryStyleBackgroundColor(name), style]}
  >
    <Text type="h3" style={[styles.categoryPillText, categoryStyleColor(name)]}>
      {name}
    </Text>
  </View>
);

CategoryPill.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  categoryPill: {
    paddingLeft: 5,
    paddingRight: 5
  },
  categoryPillText: {
    color: whiteColor,
    paddingTop: 3
  }
});

export default CategoryPill;
