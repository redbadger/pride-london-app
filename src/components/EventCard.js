// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import isSameDay from "date-fns/is_same_day";
import formatDate from "date-fns/format";
import {
  priceTagBgColor,
  imageBgColor,
  cardBgColor,
  textColor
} from "../constants/colors";
import Text from "./Text";

type Props = {
  name: string,
  locationName: string,
  price: string,
  eventStartTime: integer,
  eventEndTime: integer
};
const removeTimezoneFromDateString = isoString => isoString.slice(0, -6);

const EventCard = ({
  name,
  locationName,
  eventStartTime,
  eventEndTime,
  price
}: Props) => {
  const startTime = removeTimezoneFromDateString(eventStartTime);
  const endTime = removeTimezoneFromDateString(eventEndTime);
  const dateFormat = "DD MMMM YYYY";
  const timeFormat = "HH:mm";
  const dateDisplay = isSameDay(startTime, endTime)
    ? formatDate(startTime, dateFormat)
    : `${formatDate(startTime, dateFormat)} - ${formatDate(
        endTime,
        dateFormat
      )}`;
  const timeDisplay = `${formatDate(startTime, timeFormat)} - ${formatDate(
    endTime,
    timeFormat
  )}`;
  return (
    <View style={styles.eventCard}>
      <View style={styles.imageContainer}>
        <View style={styles.priceTagContainer}>
          <Text style={styles.eventPrice}>{price}</Text>
        </View>
      </View>
      <View style={styles.eventCardDetails}>
        <Text ellipsizeMode="tail" style={styles.eventTime}>
          {timeDisplay}
        </Text>
        <View style={styles.eventNameContainer}>
          <Text ellipsizeMode="tail" style={styles.eventName}>
            {name}
          </Text>
        </View>
        <Text ellipsizeMode="tail" style={styles.eventLocation}>
          {locationName}
        </Text>
      </View>
      <View style={styles.heartButtonContainer}>
        <Text style={styles.heartIcon}>heart</Text>
      </View>
    </View>
  );
};

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
    flexDirection: "row",
    justifyContent: "space-between"
  },
  heartIcon: {
    width: 44,
    height: 44
  },
  eventCardDetails: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 8,
    justifyContent: "space-around"
  },
  eventNameContainer: {
    flexDirection: "row"
  },
  eventName: {
    color: textColor,
    fontSize: 16,
    fontWeight: "bold",
    flexWrap: "wrap"
  },
  eventPrice: {
    fontSize: 14,
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
