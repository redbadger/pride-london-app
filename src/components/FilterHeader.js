import React from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import {
  headerBgColor,
  filterButtonColor,
  filterButtontextColor
} from "../constants/colors";
import text from "../constants/text";

const FilterHeader = () => (
  <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
    <StatusBar barStyle="light-content" />
    <View style={styles.content}>
      <View style={styles.filterButton}>
        <Text style={styles.buttonText}>{text.filterButton}</Text>
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: headerBgColor
  },
  content: {
    height: 45,
    paddingHorizontal: 20,
    paddingBottom: 15
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
