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
    <View style={styles.content}>
      <View style={styles.filterButton}>
        <Text style={styles.filterButtonText}>{text.filterButton}</Text>
      </View>
      <View style={styles.mapButton}>
        <Text style={styles.mapButtonText}>Map</Text>
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
    height: 169,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    height: 44,
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
  filterButtonText: {
    color: filterButtontextColor,
    fontWeight: "bold",
    fontSize: 18
  },
  mapButtonText: {
    fontSize: 14
  }
});

export default FilterHeader;
