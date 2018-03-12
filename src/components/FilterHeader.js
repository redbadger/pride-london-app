import React from "react";
import { Dimensions, View, StyleSheet, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import Text from "./Text";
import FilterHeaderDropdown from "./FilterHeaderDropdown";
import FilterHeaderButton from "./FilterHeaderButton";
import {
  eventListHeaderBgColor,
  headerBgColor,
  interestButtonBgColor,
  interestButtonTextColor
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
      <View style={styles.contentInterest}>
        <View style={styles.interestButton}>
          <Text type="h2" style={styles.interestButtonText}>
            {text.filterByInterest}
          </Text>
        </View>
        <View style={styles.mapButton}>
          <Text style={styles.mapButtonText}>Map</Text>
        </View>
      </View>
      <View style={styles.contentFilters}>
        <FilterHeaderDropdown
          options={OPTIONS_DAY}
          style={styles.filterButton}
        />
        <FilterHeaderDropdown
          options={OPTIONS_TIME}
          style={styles.filterButton}
        />
        <FilterHeaderButton
          text="Filters"
          onPress={() => {}}
          style={styles.filterButton}
        />
      </View>
    </View>
    <View style={styles.shape} />
  </SafeAreaView>
);

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    backgroundColor: headerBgColor
  },
  content: {
    paddingTop: 16,
    paddingBottom: 12
  },
  contentInterest: {
    alignItems: "center",
    flexDirection: "row"
  },
  interestButton: {
    flex: 1,
    height: 44,
    backgroundColor: interestButtonBgColor,
    marginLeft: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    justifyContent: "center"
  },
  interestButtonText: {
    color: interestButtonTextColor
  },
  mapButton: {
    marginHorizontal: 12,
    width: 52,
    height: 52,
    backgroundColor: interestButtonBgColor,
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 25
  },
  mapButtonText: {
    color: interestButtonTextColor,
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    paddingBottom: 6
  },
  contentFilters: {
    flexDirection: "row",
    marginTop: 8
  },
  filterButton: {
    marginLeft: 8
  },
  shape: {
    borderTopColor: headerBgColor,
    borderRightColor: headerBgColor,
    borderBottomColor: eventListHeaderBgColor,
    borderLeftColor: eventListHeaderBgColor,
    borderTopWidth: 16,
    borderLeftWidth: width
  }
});

export default FilterHeader;
