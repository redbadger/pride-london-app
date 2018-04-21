// @flow
import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { lightNavyBlueColor, eucalyptusGreenColor } from "../constants/colors";

type Props = {
  value: number
};

const NumberBadge = ({ value }: Props) => (
  <View style={styles.badge}>
    <Text type="xSmall" style={styles.value}>
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
      android: {
        marginTop: -2
      }
    })
  }
});

export default NumberBadge;
