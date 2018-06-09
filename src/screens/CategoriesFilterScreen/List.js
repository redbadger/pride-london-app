// @flow
import React from "react";
import { StyleSheet } from "react-native";
import { filterBgColor } from "../../constants/colors";
import categories from "../../constants/event-categories";
import ShadowedScrollView from "../../components/ShadowedScrollView";
import ListItem from "./ListItem";
import type { EventCategoryName } from "../../data/event-deprecated";

type Props = {
  locale: string,
  stagedCategories: Set<EventCategoryName>,
  onPress: Function
};

const List = ({ locale, stagedCategories, onPress }: Props) => (
  <ShadowedScrollView style={styles.container}>
    {Object.keys(categories[locale]).map(key => {
      const category = categories[locale][key];

      return (
        <ListItem
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

export default List;
