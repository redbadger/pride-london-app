// @flow
import React from "react";
import { StyleSheet } from "react-native";
import { filterBgColor } from "../constants/colors";
import categories from "../constants/event-categories";
import ShadowedScrollView from "./ShadowedScrollView";
import CategoriesFilter from "./CategoriesFilter";

type Props = {
  locale: string,
  stagedCategories: Set<string>,
  onPress: Function
};

const CategoriesFilterList = ({ locale, stagedCategories, onPress }: Props) => (
  <ShadowedScrollView style={styles.container}>
    {Object.keys(categories[locale]).map(key => {
      const category = categories[locale][key];

      return (
        <CategoriesFilter
          key={category.label}
          category={category}
          selected={stagedCategories.has(category.label)}
          onPress={onPress}
        />
      );
    })}
  </ShadowedScrollView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: filterBgColor
  }
});

export default CategoriesFilterList;
