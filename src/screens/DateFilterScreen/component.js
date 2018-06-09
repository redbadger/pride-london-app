// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { bgColor } from "../../constants/colors";
import Header from "../../components/Header";
import ActionButton from "../../components/ActionButton";
import ContentPadding from "../../components/ContentPadding";
import DateRangePicker from "./DateRangePicker";
import Button from "../../components/ButtonPrimary";
import text, { calendarTitleLabel } from "../../constants/text";
import { formatDateRange } from "../../data/formatters";
import type { DateRange } from "../../data/date-time";

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

  return calendarTitleLabel(
    formatDateRange(dateRange),
    dateRange.startDate === dateRange.endDate
  );
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
      <SafeAreaView
        style={styles.flex}
        forceInset={{ bottom: "always", top: "never" }}
      >
        <Header
          leftElement={<Header.BackButton onPress={onCancel} />}
          title={title}
          titleLabel={titleLabel}
          rightElement={
            !!dateRange && <ActionButton label="Reset" onPress={onReset} />
          }
        />
        <DateRangePicker
          onChange={onChange}
          dateRange={dateRange}
          forceNewRange={forceNewRange}
        />
        <View style={styles.footer}>
          <ContentPadding>
            <Button
              disabled={applyButtonDisabled}
              onPress={onApply}
              accessibilityLabel={applyButtonLabel}
            >
              {applyButtonText}
            </Button>
          </ContentPadding>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: bgColor
  },
  footer: {
    paddingVertical: 12,
    backgroundColor: bgColor
  }
});

export default DateFilterScreen;
