// @flow
import React from "react";
import { StyleSheet, View } from "react-native";
import DateRangePicker from "./DateRangePicker";
import Dialog from "./Dialog";
import Text from "./Text";
import Touchable from "./Touchable";
import text from "../constants/text";
import type { DateRange } from "../data/date-time";
import { formatDateRange } from "../data/formatters";
import { dialogTitleColor } from "../constants/colors";

type Props = {
  applyButtonText: string,
  applyButtonLabel: string,
  applyButtonDisabled?: boolean,
  dateRange: ?DateRange,
  onApply: () => void,
  onCancel: () => void,
  onChange: (?DateRange) => void,
  visible: boolean,
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

class DateRangePickerDialog extends React.PureComponent<Props> {
  static defaultProps = {
    applyButtonDisabled: false
  };

  clear = () => {
    this.props.onChange(null);
  };

  render() {
    const { dateRange, forceNewRange } = this.props;
    const title = formatTitle(dateRange);
    const titleLabel = formatTitleLabel(dateRange);

    return (
      <Dialog
        applyButtonText={this.props.applyButtonText}
        applyButtonLabel={this.props.applyButtonLabel}
        applyButtonDisabled={this.props.applyButtonDisabled}
        title={
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
        }
        headerRight={
          dateRange && (
            <Touchable
              style={styles.clearButton}
              onPress={this.clear}
              accessibilityLabel="Clear date selection"
            >
              <Text type="small" style={{ color: dialogTitleColor }}>
                Clear
              </Text>
            </Touchable>
          )
        }
        headerLeft={dateRange && <View style={styles.clearButton} />}
        onApply={this.props.onApply}
        onCancel={this.props.onCancel}
        visible={this.props.visible}
      >
        <DateRangePicker
          onChange={this.props.onChange}
          dateRange={dateRange}
          forceNewRange={forceNewRange}
        />
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  clearButton: {
    width: 44
  },
  headerTitle: {
    color: dialogTitleColor,
    // Needs to start higher up on screen than the 'Clear' button for a11y order
    height: 40,
    paddingTop: 10
  }
});

export default DateRangePickerDialog;
