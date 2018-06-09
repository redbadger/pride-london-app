// @flow
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import ContentPadding from "../../components/ContentPadding";
import Text, { scaleWithFont } from "../../components/Text";
import locationCardDefault from "../../../assets/images/locationCardDefault.png";
import { blackTwentyColor, whiteColor } from "../../constants/colors";
import type { ImageRef } from "../../data/image-ref";

type Props = {
  name?: string,
  text?: string,
  image?: ImageRef | string
};

const LocationCard = ({ name, text, image }: Props) => (
  <ContentPadding
    padding={{
      small: { horizontal: 8, vertical: 8 },
      medium: { horizontal: 16, vertical: 16 },
      large: { horizontal: 20, vertical: 20 }
    }}
  >
    <View style={styles.container}>
      <View style={styles.eventCard}>
        <View style={styles.eventCardInnerWrapper}>
          <Image
            style={styles.imageContainer}
            source={image}
            resizeMode="cover"
          />
          <View style={styles.eventCardDetails}>
            <Text
              numberOfLines={1}
              type="h3"
              color="lightNavyBlueColor"
              style={styles.eventName}
            >
              {name}
            </Text>
            <Text numberOfLines={3} type="small" color="lightNavyBlueColor">
              {text}
            </Text>
          </View>
        </View>
      </View>
    </View>
  </ContentPadding>
);

LocationCard.defaultProps = {
  name: "Come back soon",
  text: "We are currently adding the events to the map. Check back later!",
  image: locationCardDefault
};

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
    elevation: 3
  },
  eventCard: {
    height: scaleWithFont("h3", 108),
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 5
  },
  eventCardInnerWrapper: {
    flex: 1,
    flexDirection: "row"
  },
  imageContainer: {
    width: 114
  },
  eventCardDetails: {
    flex: 1,
    paddingLeft: 8,
    paddingTop: 12,
    backgroundColor: whiteColor
  },
  eventName: {
    paddingTop: 4
  }
});

export default LocationCard;
