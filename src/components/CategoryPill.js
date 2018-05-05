// @flow
import React from "react";
import { StyleSheet } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import Text from "./Text";
import Touchable from "./Touchable";
import eventCategories from "../constants/event-categories";
import locale from "../data/locale";
import { blackColor, whiteColor } from "../constants/colors";
import type { EventCategoryName } from "../data/event";

const categoryStyleColor = (category: EventCategoryName) => {
  const categoryData = eventCategories[locale][category];
  return { color: categoryData.contrast ? blackColor : whiteColor };
};

const categoryStyleBackgroundColor = (category: EventCategoryName) => {
  const categoryData = eventCategories[locale][category];
  return { backgroundColor: categoryData.color };
};

type Props = {
  name: EventCategoryName,
  style?: ViewStyleProp,
  numberOfLines?: number,
  onPress?: Function
};

const CategoryPill = ({ name, style, numberOfLines, onPress }: Props) => (
  <Touchable
    style={[styles.categoryPill, categoryStyleBackgroundColor(name), style]}
    onPress={onPress}
  >
    <Text
      type="h3"
      numberOfLines={numberOfLines}
      style={[styles.categoryPillText, categoryStyleColor(name)]}
    >
      {name}
    </Text>
  </Touchable>
);

CategoryPill.defaultProps = {
  style: {},
  numberOfLines: undefined,
  onPress: () => {}
};

const styles = StyleSheet.create({
  categoryPill: {
    minHeight: 20,
    paddingLeft: 5,
    paddingRight: 5
  },
  categoryPillText: {
    color: whiteColor,
    paddingTop: 3
  }
});

export default CategoryPill;
