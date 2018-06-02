// @flow
import React from "react";
import { Image, StyleSheet, ScrollView } from "react-native";
import Text from "../../components/Text";
import ContentPadding from "../../components/ContentPadding";
import noEvents from "../../../assets/images/emptyList.png";
import text from "../../constants/text";

const NoEvents = () => (
  <ScrollView>
    <ContentPadding style={styles.container}>
      <Image style={styles.image} source={noEvents} />
      <Text type="h1" color="lightNavyBlueColor" style={styles.title}>
        {text.noEventsTitle}
      </Text>
      <Text style={styles.infoText}>{text.noEventsDetails}</Text>
    </ContentPadding>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginBottom: 12
  },
  image: {
    alignSelf: "center",
    marginVertical: 14
  },
  title: {
    textAlign: "center"
  },
  infoText: {
    alignSelf: "center",
    fontWeight: "500",
    maxWidth: 280,
    textAlign: "center"
  }
});

export default NoEvents;
