// @flow
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  priceTagBgColor,
  imageBgColor,
  cardBgColor,
  textColor
} from "../constants/colors";

type Props = {
  name: string,
  locationName: string,
  price: string,
  startTime: integer
};

const EventCard = ({ name, locationName, startTime, price }: Props) => (
  <View style={styles.eventCard}>
    <View style={styles.imageContainer}>
      <View style={styles.priceTagContainer}>
        <Text style={styles.eventPrice}>{price}</Text>
      </View>
    </View>
    <View style={styles.eventCardDetails}>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.eventTime}>
        {startTime}
      </Text>
      <View style={styles.eventNameContainer}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.eventName}>
          {name}
        </Text>
      </View>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.eventLocation}>
        {locationName}
      </Text>
    </View>
    <View style={styles.heartButtonContainer}>
      <Text style={styles.heartIcon}>heart</Text>
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
