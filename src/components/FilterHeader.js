import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import {
  headerBgColor,
  filterButtonColor,
  filterButtontextColor
} from "../constants/colors";
import text from "../constants/text";

const FilterHeader = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <View style={styles.filterButton}>
      <Text style={styles.buttonText}>{text.filterButton}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 188,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: headerBgColor
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    height: 30,
    backgroundColor: filterButtonColor,
    padding: 10,
    borderRadius: 4,
    alignItems: "center"
  },
  buttonText: {
    color: filterButtontextColor,
    fontWeight: "bold"
  }
});

export default FilterHeader;
