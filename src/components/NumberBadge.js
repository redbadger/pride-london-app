// @flow
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { lightNavyBlueColor, eucalyptusGreenColor } from "../constants/colors";
import Text from "./Text";

type Props = {
  value: number
};

const NumberBadge = ({ value }: Props) => (
  <View style={styles.badge}>
    <Text type="xSmall" style={styles.value} testID="number-badge">
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    backgroundColor: eucalyptusGreenColor,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  value: {
    color: lightNavyBlueColor,
    fontWeight: "bold",
    ...Platform.select({
      ios: {
        marginTop: 2,
        marginLeft: 1
      }
    })
  }
});

export default NumberBadge;
