// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
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
  style?: StyleObj,
  numberOfLines?: number
};

const CategoryPill = ({ name, style, numberOfLines }: Props) => (
  <View
    style={[styles.categoryPill, categoryStyleBackgroundColor(name), style]}
  >
    <Text
      type="h3"
      numberOfLines={numberOfLines}
      style={[styles.categoryPillText, categoryStyleColor(name)]}
    >
      {name}
    </Text>
  </View>
);

CategoryPill.defaultProps = {
  style: {},
  numberOfLines: undefined
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
