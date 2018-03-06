// @flow
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { imageBgColor, cardBgColor, textColor } from "../constants/colors";
import format from "date-fns/format";

type Props = {
  name: string,
  locationName: string,
  date: string,
  startTime: integer,
  endTime: integer
};

const EventCard = ({ date, name, locationName, endTime, startTime }: Props) => (
  <View style={styles.eventCard}>
    <View style={styles.imageContainer} />
    <View style={styles.eventCardDetails}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.eventDate}>
        {date}
      </Text>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.eventName}>
        {name}
      </Text>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.eventTime}>
        {startTime}
      </Text>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.eventLocation}>
        {locationName}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  eventCard: {
    height: 108,
    borderRadius: 5,
    backgroundColor: cardBgColor,
    flexDirection: "row",
    overflow: "hidden"
  },
  imageContainer: {
    width: 114,
    height: 108,
    backgroundColor: imageBgColor
  },
  eventCardDetails: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 8,
    justifyContent: "space-around"
  },
  eventDate: {
    fontSize: 14
  },
  eventName: {
    color: textColor,
    fontSize: 16,
    fontWeight: "bold"
  },
  eventTime: {
    fontSize: 14
  },
  eventLocation: {
    fontSize: 12
  }
});

export default EventCard;
