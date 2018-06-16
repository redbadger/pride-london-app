// @flow
import React, { Component } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { equals } from "ramda";
import {
  toLondonFormat,
  now,
  isBefore,
  isSameDay,
  FORMAT_WEEKDAY_MONTH_DAY
} from "../../lib/date";

import Text from "../../components/Text";

import {
  dateRangePickerSelectedColor,
  dateRangePickerTextColor,
  mediumGreyColor
} from "../../constants/colors";

export type CalendarDay = {
  year: number,
  month: number,
  day: number,
  timestamp: number,
  dateString: string
};

export type DayMarkings = {
  [string]: DayMarking
};

type DayMarking = {
  selected?: true,
  startingDay?: true,
  endingDay?: true,
  marked?: true
};

type DayProps = {
  marking: DayMarking,
  date: CalendarDay,
  onPress: Function,
  onLongPress: Function
};

const textStyle = (marking: DayMarking, disabled: boolean) => [
  styles.text,
  marking.selected ? styles.selectedText : {},
  disabled ? styles.disabledText : {}
];

const leftFillerStyle = (marking: DayMarking) => [
  styles.filler,
  marking.selected && !marking.startingDay
    ? { backgroundColor: dateRangePickerSelectedColor }
    : { backgroundColor: "transparent" }
];

const rightFillerStyle = (marking: DayMarking) => [
  styles.filler,
  marking.selected && !marking.endingDay
    ? { backgroundColor: dateRangePickerSelectedColor }
    : { backgroundColor: "transparent" }
];

const dayStyle = (marking: DayMarking) => [
  styles.day,
  marking.selected
    ? { backgroundColor: dateRangePickerSelectedColor }
    : { backgroundColor: "transparent" }
];

const dotStyle = (marking: DayMarking) => [
  styles.dot,
  marking.selected
    ? { backgroundColor: dateRangePickerTextColor }
    : { backgroundColor: dateRangePickerSelectedColor }
];

export default class Day extends Component<DayProps> {
  static defaultProps = {
    disabled: false
  };

  shouldComponentUpdate = (nextProps: DayProps): boolean => {
    const { marking, date } = this.props;
    const { marking: nextMarking, date: nextDate } = nextProps;

    return !equals(marking, nextMarking) || !equals(date, nextDate);
  };

  onPress = () => {
    this.props.onPress(this.props.date);
  };

  onLongPress = () => {
    this.props.onLongPress(this.props.date);
  };

  render() {
    const { marking, date } = this.props;
    const dateNow = now();
    const disabled =
      isBefore(date.dateString, dateNow) &&
      !isSameDay(date.dateString, dateNow);
    const label = toLondonFormat(date.dateString, FORMAT_WEEKDAY_MONTH_DAY);
    const traits = marking.selected ? ["button", "selected"] : ["button"];

    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}
        onLongPress={this.onLongPress}
        accessibilityTraits={disabled ? ["button", "disabled"] : traits}
        accessibilityLabel={label}
        accessibilityComponentType="button"
        disabled={disabled}
        testID={`calendar-day-${date.year}-${date.month}-${date.day}`}
      >
        <View style={styles.container}>
          {marking.selected && (
            <View style={styles.overlay}>
              <View style={leftFillerStyle(marking)} />
              <View style={rightFillerStyle(marking)} />
            </View>
          )}
          <View style={dayStyle(marking)}>
            <Text type="small" style={textStyle(marking, disabled)}>
              {date.day}
            </Text>
          </View>
          {marking.marked && (
            <View style={styles.overlay}>
              <View style={dotStyle(marking)} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const FILLER_HEIGHT = 35;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch"
  },
  overlay: {
    position: "absolute",
    height: FILLER_HEIGHT,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    left: 0,
    right: 0
  },
  filler: {
    height: FILLER_HEIGHT,
    flex: 1
  },
  day: {
    width: FILLER_HEIGHT - 1,
    height: FILLER_HEIGHT,
    alignItems: "center",
    borderRadius: 17,
    backgroundColor: dateRangePickerSelectedColor
  },
  text: {
    marginTop: 7,
    textAlign: "center"
  },
  selectedText: {
    color: dateRangePickerTextColor,
    fontWeight: "bold"
  },
  disabledText: {
    color: mediumGreyColor
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginBottom: 5
  }
});
