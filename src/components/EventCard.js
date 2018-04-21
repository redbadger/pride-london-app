// @flow
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import formatDate from "date-fns/format";
import {
  eventPriceBgColor,
  eventCardTextColor,
  eventPriceColor
} from "../constants/colors";
import Text from "./Text";
import { formattedEventPrice } from "../data/formatters";

type Props = {
  name: string,
  locationName: string,
  eventPriceLow: number,
  eventPriceHigh: number,
  startTime: string,
  endTime: string,
  imageUrl: string,
  isFree: boolean
};
const removeTimezoneFromDateString = isoString => isoString.slice(0, -6);

const EventCard = ({
  name,
  locationName,
  startTime,
  endTime,
  imageUrl,
  eventPriceLow,
  eventPriceHigh,
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
      <ImageBackground
        style={styles.imageContainer}
        source={{ uri: imageUrl }}
        resizeMode="cover"
      >
        <View style={styles.eventPriceContainer}>
          <Text type="price" style={styles.eventPrice}>
            {formattedEventPrice(isFree, eventPriceLow, eventPriceHigh)}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.eventCardDetails}>
        <Text type="small" style={styles.eventTime}>
          {timeDisplay}
        </Text>
        <View style={styles.eventNameContainer}>
          <Text type="h3" style={styles.eventName} numberOfLines={2}>
            {name}
          </Text>
        </View>
        <Text style={styles.eventLocation}>{locationName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    height: 108,
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 5
  },
  imageContainer: {
    width: 114,
    height: 108
  },
  eventPriceContainer: {
    height: 23,
    backgroundColor: eventPriceBgColor,
    position: "absolute",
    paddingHorizontal: 5,
    justifyContent: "center"
  },
  eventCardDetails: {
    flex: 1,
    padding: 8
  },
  eventNameContainer: {
    flexDirection: "row"
  },
  eventName: {
    color: eventCardTextColor,
    paddingTop: 4
  },
  eventPrice: {
    color: eventPriceColor
  },
  eventTime: {
    color: eventCardTextColor
  },
  eventLocation: {
    fontSize: 12,
    lineHeight: 16,
    paddingTop: 4,
    color: eventCardTextColor
  }
});

export default EventCard;
