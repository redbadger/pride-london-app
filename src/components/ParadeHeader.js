// @flow
import React from "react";
import { View, StyleSheet } from "react-native";

import Text, { scaleWithFont } from "./Text";
import { lightNavyBlueColor } from "../constants/colors";
import text from "../constants/text";

const ParadeHeader = () => (
  <View style={styles.wrapper} testID="page-heading-parade">
    <Text type="h2" color="whiteColor">
      {text.paradeInformationScreen.headerTitle}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    height: Math.max(48, scaleWithFont("h2", 48)),
    backgroundColor: lightNavyBlueColor,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ParadeHeader;
