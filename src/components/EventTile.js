// @flow
import { format } from "date-fns";
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Text from "../components/Text";
import CategoryPill from "./CategoryPill";
import { imageBgColor, eventTileTextColor } from "../constants/colors";

type Props = {
  eventCategory: Array,
  name: string,
  date: string,
  imageUrl: string
};

const EventTile = ({ eventCategory, name, date, imageUrl }: Props) => (
  <View style={styles.eventTile}>
    <ImageBackground
      style={styles.imageContainer}
      source={{ uri: imageUrl }}
      resizeMode="cover"
    >
      <View style={styles.featureTagContainer}>
        {eventCategory
          .slice(0, 1)
          .map(categoryName => (
            <CategoryPill
              key={categoryName}
              name={categoryName}
              style={styles.categoryPill}
            />
          ))}
      </View>
    </ImageBackground>
    <View style={styles.details}>
      <Text type="small" style={{ color: eventTileTextColor }}>
        {format(date, "ddd, D MMMM")}
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
    width: 167,
    // height: 200,
    flexDirection: "column",
    overflow: "hidden"
  },
  imageContainer: {
    width: 167,
    height: 120,
    backgroundColor: imageBgColor
  },
  featureTagContainer: {
    flexWrap: "wrap"
  },
  categoryPill: {
    height: 24,
    flexWrap: "wrap",
    flexDirection: "row",
    paddingHorizontal: 5,
    marginTop: 96,
    marginLeft: 12
  },
  details: {
    minHeight: 80,
    paddingTop: 8,
    paddingHorizontal: 8
  }
});

export default EventTile;
