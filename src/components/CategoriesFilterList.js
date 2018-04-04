// @flow
import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import ContentPadding from "./ContentPadding";
import Text from "./Text";
import type { EventCategoryList } from "../data/event";
import { filterBgColor, whiteColor } from "../constants/colors";

type Props = {
  categories: EventCategoryList
};

const CategoriesFilterList = ({ categories }: Props) => (
  <ScrollView style={styles.container}>
    {categories.map(category => (
      <TouchableOpacity
        key={category.label}
        style={styles.itemContainer}
        accessibilityTraits={["button"]}
        accessibilityComponentType="button"
        delayPressIn={50}
      >
        <View
          style={{ height: 48, width: 16, backgroundColor: category.color }} // eslint-disable-line react-native/no-inline-styles
        />
        <ContentPadding style={styles.item}>
          <Text style={styles.itemText}>{category.label}</Text>
        </ContentPadding>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: filterBgColor
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 8,
    paddingTop: 8,
    paddingBottom: 12,
    width: 339,
    height: 48
  },
  item: {},
  itemText: {
    color: whiteColor,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0
  }
});

export default CategoriesFilterList;
