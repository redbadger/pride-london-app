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
  date: string,
  price: string,
  startTime: integer
};

const EventCard = ({ date, name, locationName, startTime, price }: Props) => (
  <View style={styles.eventCard}>
    <View style={styles.imageContainer}>
      <View style={styles.priceTagContainer}>
        <Text style={styles.eventPrice}>{price}</Text>
      </View>
    </View>
    <View style={styles.eventCardDetails}>
      <View style={styles.heartButtonContainer}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.eventTime}>
          {startTime}
        </Text>
        <View>
          <Text style={styles.heartIcon}>heart</Text>
        </View>
      </View>
      <Text ellipsizeMode="tail" numberOfLines={1} style={styles.eventName}>
        {name}
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
