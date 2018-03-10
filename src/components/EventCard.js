// @flow
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  priceTagBgColor,
  imageBgColor,
  cardBgColor,
  textColor
} from "../constants/colors";
import format from "date-fns/format";

type Props = {
  name: string,
  locationName: string,
  date: string,
  price: string,
  startTime: integer,
  endTime: integer
};

const EventCard = ({
  date,
  name,
  locationName,
  endTime,
  startTime,
  price
}: Props) => (
  <View style={styles.eventCard}>
    <View style={styles.imageContainer}>
      <View style={styles.priceTagContainer}>
        <Text style={styles.eventPrice}>{price}</Text>
      </View>
    </View>
    <View style={styles.eventCardDetails}>
      <View style={styles.heartButtonContainer}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.eventDate}>
          {date}
        </Text>
        <View>
          <Text>heart</Text>
        </View>
      </View>
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
    backgroundColor: cardBgColor,
    flexDirection: "row",
    overflow: "hidden"
  },
  imageContainer: {
    width: 114,
    height: 108,
    backgroundColor: imageBgColor
  },
  priceTagContainer: {
    width: 41,
    height: 23,
    backgroundColor: priceTagBgColor
  },
  heartButtonContainer: {
    width: 44,
    height: 44,
    flexDirection: "row"
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
  eventPrice: {
    alignContent: "center"
  },
  eventTime: {
    fontSize: 14
  },
  eventLocation: {
    fontSize: 12
  }
});

export default EventCard;
