// @flow
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import SaveEventButton from "./SaveEventButton";
import Text from "./Text";
import Touchable from "./Touchable";
import {
  blackTwentyColor,
  lightNavyBlueColor,
  whiteColor
} from "../constants/colors";
import { formattedEventPrice, formatTime } from "../data/formatters";
import type { ImageSource } from "../data/get-asset-source";

type Props = {
  id: string,
  name: string,
  locationName: string,
  eventPriceLow: number,
  eventPriceHigh: number,
  startTime: string,
  endTime: string,
  image: ImageSource,
  isFree: boolean,
  isSaved: boolean,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  onPress: (id: string) => void
};
const removeTimezoneFromDateString = isoString => isoString.slice(0, -6);

class EventCard extends React.PureComponent<Props> {
  static defaultProps = {
    isSaved: false
  };

  render() {
    const {
      id,
      name,
      locationName,
      startTime,
      endTime,
      image,
      eventPriceLow,
      eventPriceHigh,
      isFree,
      isSaved,
      addSavedEvent,
      removeSavedEvent,
      onPress
    } = this.props;
    const eventStartTime = removeTimezoneFromDateString(startTime);
    const eventEndTime = removeTimezoneFromDateString(endTime);
    const timeDisplay = `${formatTime(eventStartTime)} - ${formatTime(
      eventEndTime
    )}`;

    return (
      <Touchable
        style={styles.container}
        onPress={() => onPress(id)}
        accessible={false}
      >
        <View style={styles.eventCard}>
          <ImageBackground
            style={styles.imageContainer}
            source={image}
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
                  <SaveEventButton
                    active={isSaved}
                    onPress={active => {
                      if (active) {
                        addSavedEvent(id);
                      } else {
                        removeSavedEvent(id);
                      }
                    }}
                  />
                </View>
              </View>
              <Text type="small" color="lightNavyBlueColor">
                {locationName}
              </Text>
            </View>
          </View>
        </View>
      </Touchable>
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
  container: {
    borderRadius: 5,
    // The below properties are required for ioS shadow
    shadowColor: blackTwentyColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    // The below properties are required for android shadow
    borderWidth: 0,
    elevation: 3,
    backgroundColor: whiteColor
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
