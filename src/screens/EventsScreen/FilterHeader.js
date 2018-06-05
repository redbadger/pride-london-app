// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { DateRange } from "../../data/date-time";
import type { EventCategoryName } from "../../data/event-deprecated";
import DateRangePickerDialog from "./DateRangePickerDialogConnected";
import FilterHeaderButton from "./FilterHeaderButton";
import ContentPadding from "../../components/ContentPadding";
import FilterHeaderCategories from "./FilterHeaderCategories";
import {
  filterBgColor,
  filterButtonsBgColor,
  whiteColor
} from "../../constants/colors";
import text from "../../constants/text";
import { formatDateRange } from "../../data/formatters";

export type Props = {
  onFilterCategoriesPress: Function,
  dateFilter: ?DateRange,
  onFilterButtonPress: () => void,
  selectedCategories: Set<EventCategoryName>,
  numTagFiltersSelected: number
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
      onFilterButtonPress,
      numTagFiltersSelected
    } = this.props;
    const formattedDateFilter = dateFilter
      ? formatDateRange(dateFilter)
      : text.selectDates;

    return (
      <View accessibilityTraits={["header"]} style={styles.container}>
        <ContentPadding>
          <View testID="event-filter-header" style={styles.content}>
            <FilterHeaderCategories
              onFilterPress={onFilterCategoriesPress}
              selectedCategories={selectedCategories}
            />
          </View>
        </ContentPadding>
        <View style={styles.contentFilters}>
          <FilterHeaderButton
            active={!!dateFilter}
            text={formattedDateFilter}
            label={`filter by date: ${formattedDateFilter}`}
            onPress={this.showDatePicker}
            style={styles.filterButton}
          />
          <View style={styles.dividerLine} />
          <FilterHeaderButton
            active={numTagFiltersSelected > 0}
            text={numTagFiltersSelected > 0 ? text.filters : text.addFilters}
            label={numTagFiltersSelected > 0 ? text.filters : text.addFilters}
            onPress={onFilterButtonPress}
            style={styles.filterButton}
            badgeValue={
              numTagFiltersSelected > 0 ? numTagFiltersSelected : null
            }
          />
        </View>
        <DateRangePickerDialog
          onApply={this.hideDatePicker}
          onCancel={this.hideDatePicker}
          visible={this.state.datesPickerVisible}
        />
      </View>
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
    height: 48
  },
  filterButton: {
    flex: 1
  },
  dividerLine: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: whiteColor,
    opacity: 0.4
  }
});

export default FilterHeader;
