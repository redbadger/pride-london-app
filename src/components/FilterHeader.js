// @flow
import React from "react";
import { Dimensions, View, StyleSheet, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import formatDate from "date-fns/format";
import DatesPickerDialog from "./DatesPickerDialog";
import FilterHeaderDropdown from "./FilterHeaderDropdown";
import FilterHeaderButton from "./FilterHeaderButton";
import Text from "./Text";
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

type Props = {};
type State = {
  datesPickerVisible: boolean,
  filterDate: string,
  filterTime: string
};

class FilterHeader extends React.PureComponent<Props, State> {
  state = {
    datesPickerVisible: false,
    filterDate: "Any day",
    filterTime: "Any time"
  };

  onFilterDateChanged = (newDate: string) => {
    if (newDate === "Choose dates") {
      this.setState({ datesPickerVisible: true });
    } else {
      this.setState({ filterDate: newDate });
    }
  };

  onFilterTimeChanged = (newTime: string) => {
    this.setState({ filterTime: newTime });
  };

  onFilterCustomDatesCancelled = () => {
    this.setState({ datesPickerVisible: false });
  };

  onFilterCustomDatesSelected = (customDate: Date) => {
    this.setState({
      datesPickerVisible: false,
      filterDate: formatDate(customDate, "D MMM")
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
        <StatusBar barStyle="light-content" animated />
        <View testID="filter-header" style={styles.content}>
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
              onChange={this.onFilterDateChanged}
              style={styles.filterButton}
              value={this.state.filterDate}
            />
            <FilterHeaderDropdown
              options={OPTIONS_TIME}
              onChange={this.onFilterTimeChanged}
              style={styles.filterButton}
              value={this.state.filterTime}
            />
            <FilterHeaderButton
              text="Filters"
              onPress={() => {}}
              style={styles.filterButton}
            />
          </View>
        </View>
        <View style={styles.shape} />
        <DatesPickerDialog
          onCancel={this.onFilterCustomDatesCancelled}
          onDatesSelected={this.onFilterCustomDatesSelected}
          visible={this.state.datesPickerVisible}
        />
      </SafeAreaView>
    );
  }
}

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
