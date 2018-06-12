// @flow
import React from "react";
import { StyleSheet } from "react-native";
import { filterBgColor } from "../../constants/colors";
import type { EventCategoryName } from "../../data/event";
import { eventCategoryNames, getEventCategoryFromName } from "../../data/event";
import ShadowedScrollView from "../../components/ShadowedScrollView";
import ListItem from "./ListItem";

type Props = {
  stagedCategories: Set<EventCategoryName>,
  onPress: Function
};

const List = ({ stagedCategories, onPress }: Props) => (
  <ShadowedScrollView style={styles.container}>
    {eventCategoryNames.map(name => {
      const category = getEventCategoryFromName(name);

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
