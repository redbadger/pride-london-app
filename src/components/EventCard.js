// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import formatDate from "date-fns/format";
import {
  eventListBgColor,
  priceTagBgColor,
  imageBgColor,
  cardBgColor,
  textColor
} from "../constants/colors";
import Text from "./Text";

type Props = {
  name: string,
  locationName: string,
  price: number,
  startTime: string,
  endTime: string,
  isFree: boolean
};
const removeTimezoneFromDateString = isoString => isoString.slice(0, -6);

const EventCard = ({
  name,
  locationName,
  startTime,
  endTime,
  price,
  isFree
}: Props) => {
  const eventStartTime = removeTimezoneFromDateString(startTime);
  const eventEndTime = removeTimezoneFromDateString(endTime);
  const timeFormat = "HH:mm";
  const timeDisplay = `${formatDate(eventStartTime, timeFormat)} - ${formatDate(
    eventEndTime,
    timeFormat
  )}`;
  return (
    <View style={styles.eventCard}>
      <View style={styles.imageContainer}>
        <View style={styles.eventPriceContainer}>
          {isFree ? (
            <Text style={styles.eventPrice}>From £{price}</Text>
          ) : (
            <Text style={styles.eventPrice}>Free</Text>
          )}
        </View>
      </View>
      <View style={styles.eventCardDetails}>
        <Text style={styles.eventTime}>{timeDisplay}</Text>
        <View style={styles.eventNameContainer}>
          <Text style={styles.eventName}>{name}</Text>
        </View>
        <Text style={styles.eventLocation}>{locationName}</Text>
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
  eventPriceContainer: {
    height: 23,
    backgroundColor: priceTagBgColor,
    position: "absolute",
    paddingHorizontal: 8,
    borderRadius: 2
  },
  eventCardDetails: {
    flex: 1,
    padding: 8
  },
  eventNameContainer: {
    flexDirection: "row"
  },
  eventName: {
    fontFamily: "Poppins-SemiBold",
    color: textColor,
    fontSize: 16,
    lineHeight: 20,
    paddingTop: 4
  },
  eventPrice: {
    fontSize: 14,
    color: eventListBgColor
  },
  eventTime: {
    fontSize: 14,
    lineHeight: 20
  },
  eventLocation: {
    fontSize: 12,
    lineHeight: 16,
    paddingTop: 4
  }
});

export default EventCard;
