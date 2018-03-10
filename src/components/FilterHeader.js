import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import {
  headerBgColor,
  filterButtonColor,
  filterButtontextColor
} from "../constants/colors";
import text from "../constants/text";

const FilterHeader = () => (
  <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
    <StatusBar barStyle="light-content" animated />
    <View testID="filter-header" style={styles.content}>
      <View style={styles.filterButton}>
        <Text style={styles.buttonText}>{text.filterButton}</Text>
      </View>
      <View style={styles.mapButton}>
        <Text style={styles.buttonText}>Map</Text>
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: headerBgColor
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    height: 43,
    backgroundColor: filterButtonColor,
    padding: 10,
    borderRadius: 4,
    alignItems: "center"
  },
  mapButton: {
    marginLeft: 12,
    width: 52,
    height: 52,
    backgroundColor: filterButtonColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25
  },
  buttonText: {
    color: filterButtontextColor,
    fontWeight: "bold"
  }
});

export default FilterHeader;
