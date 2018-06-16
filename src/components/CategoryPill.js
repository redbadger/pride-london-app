// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { hyphenate } from "../lib/string";
import Text from "./Text";
import Touchable from "./Touchable";
import type { EventCategoryName } from "../data/event";
import { getEventCategoryFromName } from "../data/event";
import { blackColor, whiteColor } from "../constants/colors";

const categoryStyleColor = (category: EventCategoryName) => {
  const categoryData = getEventCategoryFromName(category);
  return { color: categoryData.contrast ? blackColor : whiteColor };
};

const categoryStyleBackgroundColor = (category: EventCategoryName) => {
  const categoryData = getEventCategoryFromName(category);
  return { backgroundColor: categoryData.color };
};

type Props = {
  name: EventCategoryName,
  style?: ViewStyleProp,
  numberOfLines?: number,
  onPress?: Function
};

const CategoryPill = ({ name, style, numberOfLines, onPress }: Props) => {
  const text = (
    <Text
      type="h3"
      numberOfLines={numberOfLines}
      style={[styles.categoryPillText, categoryStyleColor(name)]}
      testID={`category-pill-${hyphenate(name)}`}
    >
      {name}
    </Text>
  );
  const css = [styles.categoryPill, categoryStyleBackgroundColor(name), style];

  return onPress ? (
    <Touchable style={css} onPress={onPress}>
      {text}
    </Touchable>
  ) : (
    <View style={css}>{text}</View>
  );
};

CategoryPill.defaultProps = {
  style: {},
  numberOfLines: undefined,
  onPress: undefined
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
