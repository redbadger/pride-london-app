// @flow
import React from "react";
import { View, StyleSheet } from "react-native";
import type { DateRange } from "../../data/date-time";
import type { EventCategoryName } from "../../data/event";
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
  onDateFilterButtonPress: () => void,
  selectedCategories: Set<EventCategoryName>,
  numTagFiltersSelected: number,
  resetAllFiltersPress: () => void
};

class FilterHeader extends React.PureComponent<Props> {
  static defaultProps = {
    resetAllFiltersPress: () => {},
    selectedCategories: new Set()
  };

  render() {
    const {
      dateFilter,
      onFilterCategoriesPress,
      selectedCategories,
      onFilterButtonPress,
      onDateFilterButtonPress,
      numTagFiltersSelected,
      resetAllFiltersPress
    } = this.props;
    const formattedDateFilter = dateFilter
      ? formatDateRange(dateFilter)
      : text.selectDates;

    const anyAppliedFilters: boolean =
      !!dateFilter || numTagFiltersSelected > 0 || selectedCategories.size > 0;

    return (
      <View accessibilityTraits={["header"]} style={styles.container}>
        <ContentPadding>
          <View>
            {anyAppliedFilters && (
              <View style={styles.clearAllWrapper}>
                <FilterHeaderButton
                  active={false}
                  text="Reset all filters"
                  label="Reset all filters"
                  style={styles.clearAll}
                  onPress={resetAllFiltersPress}
                />
              </View>
            )}
            <View testID="event-filter-header" style={styles.content}>
              <FilterHeaderCategories
                onFilterPress={onFilterCategoriesPress}
                selectedCategories={selectedCategories}
              />
            </View>
          </View>
        </ContentPadding>
        <View style={styles.contentFilters}>
          <FilterHeaderButton
            active={!!dateFilter}
            text={formattedDateFilter}
            label={`filter by date: ${formattedDateFilter}`}
            onPress={onDateFilterButtonPress}
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
  },
  clearAll: {
    minHeight: 0,
    paddingTop: 16
  },
  clearAllWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

export default FilterHeader;
