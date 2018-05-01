// @flow
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Text from "../../components/Text";
import ContentPadding from "../../components/ContentPadding";
import ButtonPrimary from "../../components/ButtonPrimary";
import whiteCheck from "../../../assets/images/whiteCheck.png";
import iconSave from "../../../assets/images/save.png";
import noSavedEvents from "../../../assets/images/howToSaveEvents.png";
import text from "../../constants/text";
import { cardBgColor, titleTextColor } from "../../constants/colors";

const NoSavedEvents = () => (
  <View style={styles.container}>
    <Image style={styles.image} source={noSavedEvents} />
    <View style={styles.contentOverlay}>
      <Text type="h1" style={styles.title}>
        {text.noSavedEventsTitle}
      </Text>
      <Text style={styles.infoText}>
        {text.noSavedEventsPart1}&nbsp;
        <Image style={styles.saveIcon} source={iconSave} />
        &nbsp;{text.noSavedEventsPart2}
      </Text>
      <ButtonPrimary onPress={() => {}}>
        {text.noSavedEventsButton}
      </ButtonPrimary>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "column",
    flexWrap: "wrap",
    marginHorizontal: 12
  },
  image: {
    alignSelf: "center"
  },
  title: {
    color: titleTextColor,
    textAlign: "center",
    paddingBottom: 12
  },
  contentOverlay: {
    flex: 1,
    backgroundColor: cardBgColor,
    width: "100%",
    alignSelf: "flex-end",
    paddingTop: 12
  },
  infoText: {
    textAlign: "center",
    paddingBottom: 24
  }
});

export default NoSavedEvents;
