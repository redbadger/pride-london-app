import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EventDate = () => (
  <View style={styles.dateContainer}>
    <Text style={styles.text}>Sat, 9 June</Text>
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 10
  },
  dateContainer: {
    alignItems: "center"
  }
});

export default EventDate;
