// @flow
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { lightNavyBlueColor } from "../constants/colors";
import Text from "./Text";
import SaveEventButton from "./SaveEventButton";
import { formattedEventPrice, formatTime } from "../data/formatters";

type Props = {
  name: string,
  locationName: string,
  eventPriceLow: number,
  eventPriceHigh: number,
  startTime: string,
  endTime: string,
  imageUrl: string,
  isFree: boolean,
  isSaved: boolean,
  toggleSaved: boolean => void
};
const removeTimezoneFromDateString = isoString => isoString.slice(0, -6);

class EventCard extends React.PureComponent<Props> {
  static defaultProps = {
    isSaved: false
  };

  render() {
    const {
      name,
      locationName,
      startTime,
      endTime,
      imageUrl,
      eventPriceLow,
      eventPriceHigh,
      isFree,
      isSaved,
      toggleSaved
    } = this.props;
    const eventStartTime = removeTimezoneFromDateString(startTime);
    const eventEndTime = removeTimezoneFromDateString(endTime);
    const timeDisplay = `${formatTime(eventStartTime)} - ${formatTime(
      eventEndTime
    )}`;

    return (
      <View style={styles.eventCard}>
        <ImageBackground
          style={styles.imageContainer}
          source={{ uri: imageUrl }}
          resizeMode="cover"
        >
          <View style={styles.eventPriceContainer}>
            <Text type="price" color="whiteColor">
              {formattedEventPrice(isFree, eventPriceLow, eventPriceHigh)}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.eventCardDetails}>
          <View style={styles.column}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text
                  type="small"
                  color="lightNavyBlueColor"
                  style={styles.eventTime}
                >
                  {timeDisplay}
                </Text>
                <Text
                  numberOfLines={2}
                  type="h3"
                  color="lightNavyBlueColor"
                  style={styles.eventName}
                >
                  {name}
                </Text>
              </View>
              <View>
                <SaveEventButton active={isSaved} onPress={toggleSaved} />
              </View>
            </View>
            <Text type="small" color="lightNavyBlueColor">
              {locationName}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: "row"
  },
  column: {
    flex: 0,
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1
  },
  eventCard: {
    minHeight: 108,
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 5
  },
  imageContainer: {
    width: 114
  },
  eventPriceContainer: {
    minHeight: 23,
    backgroundColor: lightNavyBlueColor,
    position: "absolute",
    paddingHorizontal: 5,
    justifyContent: "center"
  },
  eventCardDetails: {
    flex: 1,
    paddingLeft: 8
  },
  eventTime: {
    paddingTop: 12
  },
  eventName: {
    paddingTop: 4
  }
});

export default EventCard;
