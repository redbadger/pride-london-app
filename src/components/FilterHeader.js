// @flow
import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import DateFilterDialog from "./ConnectedDateFilterDialog";
import FilterHeaderButton from "./FilterHeaderButton";
import TimeFilterDialog from "./ConnectedTimeFilterDialog";
import ContentPadding from "./ContentPadding";
import FilterHeaderCategories from "./FilterHeaderCategories";
import { filterBgColor } from "../constants/colors";
import text from "../constants/text";
import type { DateOrDateRange, Time } from "../data/date-time";
import { formatDateRange } from "../data/formatters";

export type Props = {
  onFilterCategoriesPress: Function,
  dateFilter: ?DateOrDateRange,
  timeFilter: Set<Time>,
  selectedCategories: Set<string>
};

type State = {
  datesPickerVisible: boolean,
  timesPickerVisible: boolean
};

class FilterHeader extends React.PureComponent<Props, State> {
  static defaultProps = {
    onFilterCategoriesPress: () => {}
  };

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
    const {
      dateFilter,
      timeFilter,
      onFilterCategoriesPress,
      selectedCategories
    } = this.props;
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
            <FilterHeaderCategories
              onFilterPress={onFilterCategoriesPress}
              selectedCategories={selectedCategories}
            />
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
  contentFilters: {
    flexDirection: "row",
    marginTop: 8
  },
  filterButton: {
    marginRight: 8
  }
});

export default FilterHeader;
