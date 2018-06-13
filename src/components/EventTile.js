// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import ConnectedImageBackground from "../components/ImageBackground";
import Text from "../components/Text";
import CategoryPill from "./CategoryPill";
import { imageBgColor, eventTileTextColor } from "../constants/colors";
import { toLondonFormat, FORMAT_SHORT_WEEKDAY_DAY_MONTH } from "../lib/date";
import type { FieldRef } from "../data/field-ref";
import type { EventCategoryName } from "../data/event";

type Props = {
  eventCategories: EventCategoryName[],
  name: string,
  date: string,
  imageReference: FieldRef
};

const EventTile = ({ eventCategories, name, date, imageReference }: Props) => (
  <View style={styles.eventTile}>
    <ConnectedImageBackground
      style={styles.imageContainer}
      reference={imageReference}
      resizeMode="cover"
    >
      <View style={styles.categoryPillContainer}>
        {eventCategories[0] && (
          <CategoryPill name={eventCategories[0]} numberOfLines={2} />
        )}
      </View>
    </ConnectedImageBackground>
    <View style={styles.details}>
      <Text type="small" style={{ color: eventTileTextColor }}>
        {toLondonFormat(date, FORMAT_SHORT_WEEKDAY_DAY_MONTH)}
      </Text>
      <Text
        type="h3"
        numberOfLines={2}
        style={{ color: eventTileTextColor }}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  eventTile: {
    minHeight: 200,
    borderRadius: 3,
    overflow: "hidden"
  },
  imageContainer: {
    width: "100%",
    height: 120,
    backgroundColor: imageBgColor
  },
  categoryPillContainer: {
    position: "absolute",
    flexWrap: "wrap",
    bottom: 0,
    right: 0
  },
  details: {
    paddingTop: 8,
    paddingHorizontal: 8
  }
});

export default EventTile;
