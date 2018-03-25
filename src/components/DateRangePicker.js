// @flow
import React from "react";
import { Calendar } from "react-native-calendars";
import formatDate from "date-fns/format";
import addDays from "date-fns/add_days";
import isBefore from "date-fns/is_before";
import { cardBgColor, eventListHeaderColor } from "../constants/colors";
import type { DateRange, DateOrDateRange } from "../data/date-time";

type CalendarDay = {
  year: number,
  month: number,
  day: number,
  timestamp: number,
  dateString: string
};

const getSortedDateRange = (dates: DateRange) => {
  if (dates.startDate === dates.endDate) {
    return dates.startDate;
  }

  return isBefore(dates.endDate, dates.startDate)
    ? { startDate: dates.endDate, endDate: dates.startDate }
    : dates;
};

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

const getMarkedDates = (dateRange: ?DateOrDateRange) => {
  if (!dateRange) {
    return {};
  }

  if (typeof dateRange === "string") {
    return getMarkedDate(dateRange);
  }

  return getMarkedDateRange(dateRange);
};

type Props = {
  onChange: DateOrDateRange => void,
  dateRange?: ?DateOrDateRange
};

class DateRangePicker extends React.PureComponent<Props> {
  onDaySelected = (day: CalendarDay) => {
    const { dateRange, onChange } = this.props;

    if (!dateRange || typeof dateRange !== "string") {
      return onChange(day.dateString);
    }

    onChange(
      getSortedDateRange({ startDate: dateRange, endDate: day.dateString })
    );
  };

  render() {
    const dateRange =
      this.props.dateRange && typeof this.props.dateRange === "object"
        ? getSortedDateRange(this.props.dateRange)
        : this.props.dateRange;

    return (
      <Calendar
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
