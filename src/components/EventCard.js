// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import ConnectedImageBackground from "./ImageBackground";
import SaveEventButton from "./SaveEventButton";
import Text, { scaleWithFont } from "./Text";
import Touchable from "./Touchable";
import {
  blackTwentyColor,
  lightNavyBlueColor,
  whiteColor
} from "../constants/colors";
import { formatShortEventPrice, formatTime } from "../data/formatters";
import type { FieldRef } from "../data/field-ref";

type Props = {
  id: string,
  name: string,
  locationName: string,
  eventPriceLow: number,
  eventPriceHigh: number,
  startTime: string,
  endTime: string,
  imageReference: FieldRef,
  isSaved: boolean,
  addSavedEvent: string => void,
  removeSavedEvent: string => void,
  onPress: (id: string) => void,
  testID?: string
};

class EventCard extends React.PureComponent<Props> {
  static defaultProps = {
    isSaved: false,
    testID: undefined
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
      imageReference,
      eventPriceLow,
      eventPriceHigh,
      isSaved,
      onPress,
      testID
    } = this.props;
    const timeDisplay = `${formatTime(startTime)} – ${formatTime(endTime)}`;

    return (
      <View style={styles.container} testID={testID}>
        <View style={styles.eventCard}>
          <Touchable style={styles.touchable} onPress={() => onPress(id)}>
            <ConnectedImageBackground
              style={styles.imageContainer}
              reference={imageReference}
              resizeMode="cover"
            >
              <View style={styles.eventPriceContainer}>
                <Text type="price" color="whiteColor">
                  {formatShortEventPrice(eventPriceLow, eventPriceHigh)}
                </Text>
              </View>
            </ConnectedImageBackground>
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
          <SaveEventButton
            active={isSaved}
            onPress={this.handleToggleSave}
            testID={testID ? `${testID}-save-event-button` : undefined}
          />
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
