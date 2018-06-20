// @flow
import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import type { NavigationScreenProp, NavigationState } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import SafeAreaView from "react-native-safe-area-view";
import {
  bgColor,
  blackZeroColor,
  blackFifteenColor
} from "../../constants/colors";
import Header from "../../components/Header";
import ActionButton from "../../components/ActionButton";
import ContentPadding from "../../components/ContentPadding";
import DateRangePicker from "./DateRangePicker";
import Button from "../../components/ButtonPrimary";
import text, { calendarTitleLabel } from "../../constants/text";
import { formatDateRange } from "../../data/formatters";
import type { DateRange } from "../../data/date-time";

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  dateRange: ?DateRange,
  numberOfEvents: number,
  onChange: (?DateRange) => void
};

type State = {
  forceNewRange: boolean
};

const formatTitle = (dateRange: ?DateRange): string => {
  if (!dateRange) return text.filterDayPickerTitle;

  return formatDateRange(dateRange);
};

const formatTitleLabel = (dateRange: ?DateRange): string => {
  if (!dateRange) return text.filterDayPickerTitle;

  return calendarTitleLabel(
    formatDateRange(dateRange),
    dateRange.startDate === dateRange.endDate
  );
};

class DateFilterScreen extends PureComponent<Props, State> {
  state = {
    forceNewRange: true
  };

  updateDateRange = (dateRange: ?DateRange) => {
    this.setState({ forceNewRange: false });
    this.props.onChange(dateRange);
  };

  resetDateRange = () => {
    this.updateDateRange(null);
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { dateRange, numberOfEvents } = this.props;

    const title = formatTitle(dateRange);
    const titleLabel = formatTitleLabel(dateRange);

    return (
      <SafeAreaView
        style={styles.flex}
        forceInset={{ bottom: "always", top: "never" }}
      >
        <Header
          leftElement={<Header.BackButton onPress={this.goBack} />}
          title={title}
          titleLabel={titleLabel}
          rightElement={
            !!dateRange && (
              <ActionButton label="Reset" onPress={this.resetDateRange} />
            )
          }
        />
        <View style={styles.calendarContainer}>
          <DateRangePicker
            onChange={this.updateDateRange}
            dateRange={dateRange}
            forceNewRange={this.state.forceNewRange}
          />
          <LinearGradient
            colors={[blackZeroColor, blackFifteenColor]}
            style={[styles.bottomShadow]}
          />
        </View>
        <View style={styles.footer}>
          <ContentPadding>
            <Button
              disabled={numberOfEvents <= 0}
              onPress={this.goBack}
              accessibilityLabel={text.filterPickerApplyLabel(numberOfEvents)}
              testID="apply-date-filter-button"
            >
              {text.filterPickerApply(numberOfEvents)}
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
  calendarContainer: {
    flex: 1
  },
  bottomShadow: {
    width: "100%",
    height: 8,
    position: "absolute",
    left: 0,
    bottom: 0
  },
  footer: {
    paddingVertical: 12,
    backgroundColor: bgColor
  }
});

export default DateFilterScreen;
