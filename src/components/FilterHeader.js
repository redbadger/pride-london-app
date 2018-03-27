// @flow
import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import DateFilterDialog from "./ConnectedDateFilterDialog";
import FilterHeaderButton from "./FilterHeaderButton";
import TimeFilterDialog from "./ConnectedTimeFilterDialog";
import Text from "./Text";
import ContentPadding from "./ContentPadding";
import {
  interestButtonBgColor,
  interestButtonTextColor,
  filterBgColor,
  filterShowMeTextColor,
  categoriesFilterButtonBgColor
} from "../constants/colors";
import text from "../constants/text";
import type { DateOrDateRange, Time } from "../data/date-time";
import { formatDateRange } from "../data/formatters";

import chevronRightImg from "../../assets/images/chevronRight.png";

type Props = {
  dateFilter: ?DateOrDateRange,
  timeFilter: Set<Time>
};

type State = {
  datesPickerVisible: boolean,
  timesPickerVisible: boolean
};

class FilterHeader extends React.PureComponent<Props, State> {
  state = {
    datesPickerVisible: false,
    timesPickerVisible: false
  };

  showDatePicker = () => {
    this.setState({ datesPickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ datesPickerVisible: false });
  };

  showTimePicker = () => {
    this.setState({ timesPickerVisible: true });
  };

  hideTimePicker = () => {
    this.setState({ timesPickerVisible: false });
  };

  render() {
    const { dateFilter, timeFilter } = this.props;
    const formattedDateFilter = dateFilter
      ? formatDateRange(dateFilter)
      : text.anyDay;
    const timeArray = Array.from(timeFilter);
    const formattedTimeFilter =
      timeArray.length > 0 && timeArray.length < 3
        ? timeArray.map(time => text.time[time]).join(", ")
        : text.anyTime;

    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
        <StatusBar barStyle="light-content" animated />
        <ContentPadding>
          <View testID="filter-header" style={styles.content}>
            <View style={styles.contentInterest}>
              <Text type="h1" style={styles.filterTitle}>
                {text.filterTitle}
              </Text>
              <View style={styles.interestButton}>
                <Text type="h2" style={styles.interestButtonText}>
                  {text.filterByInterest}
                </Text>
                <TouchableOpacity
                  accessibilityTraits={["button"]}
                  accessibilityComponentType="button"
                  style={styles.categoriesFilterButton}
                >
                  <Image source={chevronRightImg} />
                </TouchableOpacity>
              </View>
              <View style={styles.mapButton}>
                <Text style={styles.mapButtonText}>Map</Text>
              </View>
            </View>
            <View style={styles.contentFilters}>
              <FilterHeaderButton
                text={formattedDateFilter}
                onPress={this.showDatePicker}
                style={styles.filterButton}
              />
              <FilterHeaderButton
                text={formattedTimeFilter}
                onPress={this.showTimePicker}
                style={styles.filterButton}
              />
              <FilterHeaderButton
                text={text.filters}
                onPress={() => {}}
                style={styles.filterButton}
              />
            </View>
          </View>
        </ContentPadding>
        <DateFilterDialog
          onApply={this.hideDatePicker}
          onCancel={this.hideDatePicker}
          visible={this.state.datesPickerVisible}
        />
        <TimeFilterDialog
          onApply={this.hideTimePicker}
          onCancel={this.hideTimePicker}
          visible={this.state.timesPickerVisible}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: filterBgColor
  },
  content: {
    paddingTop: 16,
    paddingBottom: 12
  },
  contentInterest: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  filterTitle: {
    color: filterShowMeTextColor,
    paddingTop: 5,
    marginRight: 8
  },
  categoriesFilterButton: {
    width: 38,
    height: 40,
    backgroundColor: categoriesFilterButtonBgColor,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  interestButton: {
    flex: 1,
    height: 40,
    backgroundColor: interestButtonBgColor,
    borderRadius: 4,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8
  },
  interestButtonText: {
    color: interestButtonTextColor
  },
  mapButton: {
    marginLeft: 12,
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
    marginRight: 8
  }
});

export default FilterHeader;
