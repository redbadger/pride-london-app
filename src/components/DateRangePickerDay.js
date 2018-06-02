// @flow
import React, { Component } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { equals } from "ramda";
import {
  toFormat,
  now,
  isBefore,
  isSameDay,
  FORMAT_WEEKDAY_MONTH_DAY
} from "../lib/date";

import Text from "./Text";

import {
  dateRangePickerSelectedColor,
  dateRangePickerDisabledTextColor,
  dateRangePickerTextColor
} from "../constants/colors";

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
  state?: "disabled",
  marking: DayMarking,
  date: CalendarDay,
  onPress: Function,
  onLongPress: Function
};

const textStyle = (marking: DayMarking, state: ?"disabled") => [
  styles.text,
  marking.selected ? styles.selectedText : {},
  state === "disabled" ? styles.disabledText : {}
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
    state: undefined
  };

  shouldComponentUpdate = (nextProps: DayProps): boolean => {
    const { state, marking, date } = this.props;
    const {
      state: nextState,
      marking: nextMarking,
      date: nextDate
    } = nextProps;

    return (
      state !== nextState ||
      !equals(marking, nextMarking) ||
      !equals(date, nextDate)
    );
  };

  onPress = () => {
    if (this.props.state !== "disabled") this.props.onPress(this.props.date);
  };

  onLongPress = () => {
    if (this.props.state !== "disabled")
      this.props.onLongPress(this.props.date);
  };

  render() {
    const { state, marking, date } = this.props;
    const dateNow = now();
    const beforeToday =
      isBefore(date.dateString, dateNow) &&
      !isSameDay(date.dateString, dateNow);
    const label = toFormat(date.dateString, FORMAT_WEEKDAY_MONTH_DAY);
    const traits = marking.selected ? ["button", "selected"] : ["button"];

    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}
        onLongPress={this.onLongPress}
        accessibilityTraits={beforeToday ? ["button", "disabled"] : traits}
        accessibilityLabel={label}
        accessibilityComponentType="button"
        disabled={beforeToday}
      >
        <View style={[styles.container, beforeToday ? styles.faded : {}]}>
          {marking.selected && (
            <View style={styles.overlay}>
              <View style={leftFillerStyle(marking)} />
              <View style={rightFillerStyle(marking)} />
            </View>
          )}
          <View style={dayStyle(marking)}>
            <Text type="small" style={textStyle(marking, state)}>
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
  faded: {
    opacity: 0.5
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
    color: dateRangePickerDisabledTextColor
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginBottom: 5
  }
});
