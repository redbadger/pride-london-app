// @flow
import React, { PureComponent } from "react";
import { Text, View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import {
  lightNavyBlueColor,
  dialogTitleColor,
  dialogBgColor,
  dialogHeaderDividerColor
} from "../../constants/colors";
import Header from "./Header";
import DateRangePicker from "./DateRangePicker";
import Button from "../../components/ButtonPrimary";
import text from "../../constants/text";
import { formatDateRange } from "../../data/formatters";

type Props = {
  applyButtonText: string,
  applyButtonLabel: string,
  applyButtonDisabled?: boolean,
  dateRange: ?DateRange,
  onApply: () => void,
  onCancel: () => void,
  onReset: () => void,
  onChange: (?DateRange) => void,
  forceNewRange: boolean
};

const formatTitle = (dateRange: ?DateRange): string => {
  if (!dateRange) return text.filterDayPickerTitle;

  return (
    formatDateRange(dateRange) +
    (dateRange.startDate === dateRange.endDate ? " -" : "")
  );
};

const formatTitleLabel = (dateRange: ?DateRange): string => {
  if (!dateRange) return text.filterDayPickerTitle;

  return `Selected: ${formatDateRange(dateRange)} ${
    dateRange.startDate === dateRange.endDate
      ? ", pick another day to select range"
      : ""
  }`;
};

class DateFilterScreen extends PureComponent<Props> {
  static defaultProps = {
    applyButtonDisabled: false
  };

  render() {
    const {
      onChange,
      dateRange,
      forceNewRange,
      applyButtonDisabled,
      onApply,
      onCancel,
      onReset,
      applyButtonLabel,
      applyButtonText
    } = this.props;
    const title = formatTitle(dateRange);
    const titleLabel = formatTitleLabel(dateRange);

    return (
      <SafeAreaView style={styles.container}>
        <Header onCancel={onCancel} onReset={onReset} dateRange={dateRange} />
        <View style={styles.page}>
          <View>
            <View style={styles.content}>
              <View style={styles.header}>
                <Text
                  type="h3"
                  style={styles.headerTitle}
                  accessible
                  accessibilityLabel={titleLabel}
                  accessibilityTraits={["header"]}
                  accessibilityLiveRegion="polite"
                >
                  {title}
                </Text>
              </View>
              <DateRangePicker
                onChange={onChange}
                dateRange={dateRange}
                forceNewRange={forceNewRange}
              />
            </View>
            <View style={styles.applyButtonContainer}>
              <Button
                disabled={applyButtonDisabled}
                onPress={onApply}
                accessibilityLabel={applyButtonLabel}
              >
                {applyButtonText}
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 8,
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: lightNavyBlueColor
  },
  headerTitle: {
    color: dialogTitleColor,
    height: 40,
    top: 10
  },
  content: {
    backgroundColor: dialogBgColor,
    borderRadius: 4,
    paddingBottom: 8
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: dialogHeaderDividerColor
  },
  applyButtonContainer: {
    marginTop: 8
  }
});

export default DateFilterScreen;
