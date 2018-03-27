// @flow
import { format } from "date-fns";
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Text from "../components/Text";
import { imageBgColor, eventTileTextColor } from "../constants/colors";

type Props = {
  name: string,
  date: string,
  imageUrl: string
};

const EventTile = ({ name, date, imageUrl }: Props) => (
  <View style={styles.eventTile}>
    <ImageBackground
      style={styles.imageContainer}
      source={{ uri: imageUrl }}
      resizeMode="cover"
    />
    <View style={styles.details}>
      <Text type="small" style={{ color: eventTileTextColor }}>
        {format(date, "ddd, D MMMM")}
      </Text>
      <Text
        type="h4"
        style={{ color: eventTileTextColor }}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {name}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  eventTile: {
    flexDirection: "column",
    overflow: "hidden"
  },
  imageContainer: {
    borderRadius: 4,
    height: 120,
    backgroundColor: imageBgColor
  },
  details: {
    minHeight: 80,
    paddingTop: 8
  }
});

export default EventTile;
