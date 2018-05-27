// @flow
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import SaveEventButton from "./SaveEventButton";
import Text, { scaleWithFont } from "./Text";
import Touchable from "./Touchable";
import {
  blackTwentyColor,
  lightNavyBlueColor,
  whiteColor
} from "../constants/colors";
import { formatShortEventPrice, formatTime } from "../data/formatters";
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
  isSaved: boolean,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  onPress: (id: string) => void
};

class EventCard extends React.PureComponent<Props> {
  static defaultProps = {
    isSaved: false
  };

  handleToggleSave = (active: boolean) => {
    if (active) {
      this.props.addSavedEvent(this.props.id);
    } else {
      this.props.removeSavedEvent(this.props.id);
    }
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
      isSaved,
      onPress
    } = this.props;
    const timeDisplay = `${formatTime(startTime)} – ${formatTime(endTime)}`;

    return (
      <View style={styles.container}>
        <View style={styles.eventCard}>
          <Touchable style={styles.touchable} onPress={() => onPress(id)}>
            <ImageBackground
              style={styles.imageContainer}
              source={image}
              resizeMode="cover"
            >
              <View style={styles.eventPriceContainer}>
                <Text type="price" color="whiteColor">
                  {formatShortEventPrice(eventPriceLow, eventPriceHigh)}
                </Text>
              </View>
            </ImageBackground>
            <View style={styles.eventCardDetails}>
              <Text type="small" color="lightNavyBlueColor">
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
              <Text numberOfLines={1} type="small" color="lightNavyBlueColor">
                {locationName}
              </Text>
            </View>
          </Touchable>
          <SaveEventButton active={isSaved} onPress={this.handleToggleSave} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    height: scaleWithFont("h3", 108),
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 5
  },
  touchable: {
    flexGrow: 1,
    flex: 0,
    flexDirection: "row"
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
    paddingLeft: 8,
    paddingTop: 12
  },
  eventName: {
    paddingTop: 4
  }
});

export default EventCard;
