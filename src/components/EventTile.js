// @flow
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Text from "../components/Text";
import CategoryPill from "./CategoryPill";
import { imageBgColor, eventTileTextColor } from "../constants/colors";
import { toFormat } from "../lib/date";
import type { EventCategoryName } from "../data/event";
import type { ImageSource } from "../data/get-asset-source";

type Props = {
  eventCategories: EventCategoryName[],
  name: string,
  date: string,
  image: ImageSource
};

const EventTile = ({ eventCategories, name, date, image }: Props) => (
  <View style={styles.eventTile}>
    <ImageBackground
      style={styles.imageContainer}
      source={image}
      resizeMode="cover"
    >
      <View style={styles.categoryPillContainer}>
        {eventCategories[0] && (
          <CategoryPill name={eventCategories[0]} numberOfLines={2} />
        )}
      </View>
    </ImageBackground>
    <View style={styles.details}>
      <Text type="small" style={{ color: eventTileTextColor }}>
        {toFormat(date, "ddd, D MMMM")}
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
