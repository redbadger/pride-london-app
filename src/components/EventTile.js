// @flow
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { imageBgColor, cardBgColor, textColor } from "../constants/colors";

type Props = {
  name: string
};

const EventTile = ({ name }: Props) => (
  <View style={styles.eventTile}>
    <View style={styles.imageContainer} />
    <View style={styles.eventTileDetails}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.eventTitle}>
        {name}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  eventTile: {
    borderRadius: 5,
    backgroundColor: cardBgColor,
    flexDirection: "column",
    overflow: "hidden"
  },
  imageContainer: {
    height: 95,
    backgroundColor: imageBgColor
  },
  eventTileDetails: {
    padding: 15
  },
  eventTitle: {
    color: textColor,
    fontWeight: "bold"
  }
});

export default EventTile;
