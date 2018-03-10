import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import Text from "./Text";
import FilterDropdown from "./FilterDropdown";
import {
  headerBgColor,
  filterButtonColor,
  filterButtontextColor
} from "../constants/colors";
import text from "../constants/text";

const OPTIONS_DAY = [
  "Any day",
  "Today",
  "Tomorrow",
  "This weekend",
  "Next week",
  "Choose dates"
];
const OPTIONS_TIME = ["Any time", "Morning", "Afternoon", "Evening"];

const FilterHeader = () => (
  <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
    <StatusBar barStyle="light-content" animated />
    <View style={styles.content}>
      <View style={styles.contentSearch}>
        <View style={styles.filterButton}>
          <Text type="h2" style={styles.filterButtonText}>
            {text.filterButton}
          </Text>
        </View>
        <View style={styles.mapButton}>
          <Text style={styles.mapButtonText}>Map</Text>
        </View>
      </View>
      <View style={styles.contentFilters}>
        <FilterDropdown options={OPTIONS_DAY} />
        <FilterDropdown options={OPTIONS_TIME} />
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: headerBgColor
  },
  content: {
    height: 169,
    paddingTop: 12,
    paddingBottom: 12
  },
  contentSearch: {
    alignItems: "center",
    flexDirection: "row"
  },
  filterButton: {
    flex: 1,
    height: 44,
    backgroundColor: filterButtonColor,
    marginLeft: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    justifyContent: "center"
  },
  mapButton: {
    marginHorizontal: 12,
    width: 52,
    height: 52,
    backgroundColor: filterButtonColor,
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 25
  },
  filterButtonText: {
    color: filterButtontextColor
  },
  mapButtonText: {
    color: filterButtontextColor,
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    paddingBottom: 6
  },
  contentFilters: {
    marginLeft: 8,
    flexDirection: "row"
  }
});

export default FilterHeader;
