// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { lightNavyBlueColor } from "../../constants/colors";
import Header from "./Header";
import DateRangePicker from "./DateRangePicker";
import Button from "../../components/ButtonPrimary";

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

// const formatTitle = (dateRange: ?DateRange): string => {
//   if (!dateRange) return text.filterDayPickerTitle;

//   return (
//     formatDateRange(dateRange) +
//     (dateRange.startDate === dateRange.endDate ? " -" : "")
//   );
// };

// const formatTitleLabel = (dateRange: ?DateRange): string => {
//   if (!dateRange) return text.filterDayPickerTitle;

//   return `Selected: ${formatDateRange(dateRange)} ${
//     dateRange.startDate === dateRange.endDate
//       ? ", pick another day to select range"
//       : ""
//   }`;
// };

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
    // const title = formatTitle(dateRange);
    // const titleLabel = formatTitleLabel(dateRange);

    return (
      <SafeAreaView style={styles.container}>
        <Header onCancel={onCancel} onReset={onReset} />
        <View style={styles.list}>
          <DateRangePicker
            onChange={onChange}
            dateRange={dateRange}
            forceNewRange={forceNewRange}
          />
          <Button
            disabled={applyButtonDisabled}
            onPress={onApply}
            accessibilityLabel={applyButtonLabel}
          >
            {applyButtonText}
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: lightNavyBlueColor
  }
});

export default DateFilterScreen;
