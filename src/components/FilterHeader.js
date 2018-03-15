// @flow
import React from "react";
import { Dimensions, View, StyleSheet, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import DatesPickerDialog from "./DatesPickerDialog";
import FilterHeaderButton from "./FilterHeaderButton";
import TimesPickerDialog from "./TimesPickerDialog";
import Text from "./Text";
import {
  eventListHeaderBgColor,
  headerBgColor,
  interestButtonBgColor,
  interestButtonTextColor
} from "../constants/colors";
import text from "../constants/text";
import type { DateOrDateRange } from "../data/date-range";
import { formatDateRange } from "../data/formatters";

type Props = {};
type State = {
  datesPickerVisible: boolean,
  timesPickerVisible: boolean,
  filterDate: string,
  filterTime: string
};

class FilterHeader extends React.PureComponent<Props, State> {
  state = {
    datesPickerVisible: false,
    timesPickerVisible: false,
    filterDate: "Any day",
    filterTime: "Any time"
  };

  onFilterDatePress = () => {
    this.setState({ datesPickerVisible: true });
  };

  onFilterTimePress = () => {
    this.setState({ timesPickerVisible: true });
  };

  onFilterCustomDatesCancelled = () => {
    this.setState({ datesPickerVisible: false });
  };

  onFilterCustomDatesSelected = (dates: ?DateOrDateRange) => {
    const filterDate = dates ? formatDateRange(dates) : "Any day";

    this.setState({
      datesPickerVisible: false,
      filterDate
    });
  };

  onFilterCustomTimesCancelled = () => {
    this.setState({ timesPickerVisible: false });
  };

  onFilterCustomTimesSelected = (times: string[]) => {
    let filterTime = "Any time";
    if (times.length < 3) {
      filterTime = times.join(", ");
    }

    this.setState({
      timesPickerVisible: false,
      filterTime
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
            <FilterHeaderButton
              text={this.state.filterDate}
              onPress={this.onFilterDatePress}
              style={styles.filterButton}
            />
            <FilterHeaderButton
              text={this.state.filterTime}
              onPress={this.onFilterTimePress}
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
        <DatesPickerDialog
          onCancel={this.onFilterCustomDatesCancelled}
          onDatesSelected={this.onFilterCustomDatesSelected}
          visible={this.state.datesPickerVisible}
        />
        <TimesPickerDialog
          onCancel={this.onFilterCustomTimesCancelled}
          onTimesSelected={this.onFilterCustomTimesSelected}
          visible={this.state.timesPickerVisible}
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
