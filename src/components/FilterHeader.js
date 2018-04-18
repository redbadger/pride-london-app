// @flow
import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import DateFilterDialog from "./ConnectedDateFilterDialog";
import FilterHeaderButton from "./FilterHeaderButton";
import ContentPadding from "./ContentPadding";
import FilterHeaderCategories from "./FilterHeaderCategories";
import { filterBgColor, filterButtonsBgColor } from "../constants/colors";
import text from "../constants/text";
import type { DateRange } from "../data/date-time";
import { formatDateRange } from "../data/formatters";

export type Props = {
  onFilterCategoriesPress: Function,
  dateFilter: ?DateRange,
  onFilterButtonPress: () => void,
  selectedCategories: Set<string>
};

type State = {
  datesPickerVisible: boolean
};

class FilterHeader extends React.PureComponent<Props, State> {
  state = {
    datesPickerVisible: false
  };

  showDatePicker = () => {
    this.setState({ datesPickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ datesPickerVisible: false });
  };

  render() {
    const {
      dateFilter,
      onFilterCategoriesPress,
      selectedCategories,
      onFilterButtonPress
    } = this.props;
    const formattedDateFilter = dateFilter
      ? formatDateRange(dateFilter)
      : text.selectDates;

    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
        <StatusBar barStyle="light-content" animated />
        <ContentPadding>
          <View testID="filter-header" style={styles.content}>
            <FilterHeaderCategories
              onFilterPress={onFilterCategoriesPress}
              selectedCategories={selectedCategories}
            />
          </View>
        </ContentPadding>
        <ContentPadding style={styles.contentFilters}>
          <FilterHeaderButton
            text={formattedDateFilter}
            onPress={this.showDatePicker}
          />
          <FilterHeaderButton
            text={text.addFilters}
            onPress={onFilterButtonPress}
          />
        </ContentPadding>
        <DateFilterDialog
          onApply={this.hideDatePicker}
          onCancel={this.hideDatePicker}
          visible={this.state.datesPickerVisible}
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
    justifyContent: "space-between",
    backgroundColor: filterButtonsBgColor,
    marginTop: 8
  }
});

export default FilterHeader;
