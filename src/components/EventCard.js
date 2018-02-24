// @flow
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { imageBgColor, cardBgColor, textColor } from "../constants/colors";

type Props = {
  name: string
};

const EventCard = ({ name }: Props) => (
  <View style={styles.eventCard}>
    <View style={styles.imageContainer} />
    <View style={styles.eventCardDetails}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.eventTitle}>
        {name}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  eventCard: {
    height: 95,
    borderRadius: 5,
    backgroundColor: cardBgColor,
    flexDirection: "row",
    overflow: "hidden"
  },
  imageContainer: {
    width: 95,
    height: 95,
    backgroundColor: imageBgColor
  },
  eventCardDetails: {
    flex: 1,
    padding: 15
  },
  eventTitle: {
    color: textColor,
    fontWeight: "bold"
  }
});

export default EventCard;
