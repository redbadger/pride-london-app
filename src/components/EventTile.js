// @flow
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Text from "../components/Text";
import { imageBgColor, cardBgColor } from "../constants/colors";

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
      <Text type="small" ellipsizeMode="tail" numberOfLines={2}>
        {date}
      </Text>
      <Text type="h4" ellipsizeMode="tail" numberOfLines={2}>
        {name}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  eventTile: {
    backgroundColor: cardBgColor,
    flexDirection: "column",
    overflow: "hidden"
  },
  imageContainer: {
    borderRadius: 4,
    height: 120,
    backgroundColor: imageBgColor
  },
  details: {
    height: 80,
    paddingTop: 8
  }
});

export default EventTile;
