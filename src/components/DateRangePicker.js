// @flow
import React from "react";
import { Calendar } from "react-native-calendars";
import formatDate from "date-fns/format";
import addDays from "date-fns/add_days";
import isBefore from "date-fns/is_before";
import { cardBgColor, eventListHeaderColor } from "../constants/colors";
import type { DateRange } from "../data/date-time";

type CalendarDay = {
  year: number,
  month: number,
  day: number,
  timestamp: number,
  dateString: string
};

const getSortedDateRange = (dates: DateRange) =>
  isBefore(dates.endDate, dates.startDate)
    ? { startDate: dates.endDate, endDate: dates.startDate }
    : dates;

const getMarkedDate = (date: string) => ({
  [date]: {
    startingDay: true,
    endingDay: true,
    color: eventListHeaderColor,
    textColor: cardBgColor
  }
});

const getMarkedDateRange = (dateRange: DateRange) => {
  const { startDate, endDate } = dateRange;
  const template = {
    color: eventListHeaderColor,
    textColor: cardBgColor
  };

  const markedDates = {};

  // Start
  markedDates[startDate] = {
    ...template,
    startingDay: true
  };

  // In between
  let inBetweenDate = startDate;
  do {
    inBetweenDate = formatDate(addDays(inBetweenDate, 1), "YYYY-MM-DD");
    markedDates[inBetweenDate] = { ...template };
  } while (inBetweenDate !== endDate);

  // End
  markedDates[endDate] = {
    ...template,
    endingDay: true
  };

  return markedDates;
};

const getMarkedDates = (dateRange: ?DateRange) => {
  if (!dateRange) {
    return {};
  }

  if (dateRange.startDate === dateRange.endDate) {
    return getMarkedDate(dateRange.startDate);
  }

  return getMarkedDateRange(dateRange);
};

type Props = {
  onChange: DateRange => void,
  dateRange?: ?DateRange,
  forceNewRange: boolean
};

class DateRangePicker extends React.PureComponent<Props> {
  onDaySelected = (day: CalendarDay) => {
    const { dateRange, onChange, forceNewRange } = this.props;

    if (
      !dateRange ||
      forceNewRange ||
      dateRange.startDate !== dateRange.endDate
    ) {
      return onChange({ startDate: day.dateString, endDate: day.dateString });
    }

    return onChange(
      getSortedDateRange({
        startDate: dateRange.startDate,
        endDate: day.dateString
      })
    );
  };

  render() {
    const dateRange = this.props.dateRange
      ? getSortedDateRange(this.props.dateRange)
      : this.props.dateRange;

    return (
      <Calendar
        current={dateRange ? dateRange.startDate : null}
        markedDates={getMarkedDates(dateRange)}
        markingType="period"
        onDayPress={this.onDaySelected}
        theme={{
          textDayFontFamily: "Roboto",
          textMonthFontFamily: "Roboto",
          textDayHeaderFontFamily: "Roboto",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
    );
  }
}

export default DateRangePicker;
