// @flow
import { format } from "date-fns";
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import Text from "../components/Text";
import {
  imageBgColor,
  eventTileTextColor,
  coralColor,
  whiteColor
} from "../constants/colors";

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
    >
      <View style={styles.featureTagContainer}>
        <Text type="h3" style={{ color: whiteColor }}>
          Cabaret & Variety
        </Text>
      </View>
    </ImageBackground>
    <View style={styles.details}>
      <Text type="small" style={{ color: eventTileTextColor }}>
        {format(date, "ddd, D MMMM")}
      </Text>
      <Text
        type="h3"
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
    height: 24,
    backgroundColor: coralColor,
    justifyContent: "center",
    position: "absolute",
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
