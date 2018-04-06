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
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
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
import CategoriesPills from "./CategoriesPills";

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

type CategoriesFilterButtonProps = {
  style?: StyleObj,
  onPress: Function
};

const CategoriesFilterButton = ({
  style,
  onPress
}: CategoriesFilterButtonProps) => (
  <TouchableOpacity
    accessibilityTraits={["button"]}
    accessibilityComponentType="button"
    style={[styles.categoriesFilterButton, style]}
    onPress={onPress}
  >
    <Image source={chevronRightImg} />
  </TouchableOpacity>
);

CategoriesFilterButton.defaultProps = {
  style: {}
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
            {selectedCategories.size === 0 ? (
              <View style={styles.contentInterest}>
                <Text type="h1" style={styles.filterTitle}>
                  {text.filterTitle}
                </Text>
                <View style={styles.interestButton}>
                  <Text type="h2" style={styles.interestButtonText}>
                    {text.filterByInterest}
                  </Text>
                  <CategoriesFilterButton onPress={onFilterCategoriesPress} />
                </View>
              </View>
            ) : (
              <View style={styles.categoryPillsContainer}>
                <CategoriesPills selectedCategories={selectedCategories} />
                <CategoriesFilterButton
                  style={styles.categoriesFilterOverButton}
                  onPress={onFilterCategoriesPress}
                />
              </View>
            )}
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
  categoryPillsContainer: {
    position: "relative"
  },
  categoriesFilterOverButton: {
    position: "absolute",
    right: 0,
    top: 0
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
  contentFilters: {
    flexDirection: "row",
    marginTop: 8
  },
  filterButton: {
    marginRight: 8
  }
});

export default FilterHeader;
