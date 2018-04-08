// @flow
import React from "react";
import { Calendar } from "react-native-calendars";
import formatDate from "date-fns/format";
import addDays from "date-fns/add_days";
import isBefore from "date-fns/is_before";
import type { DateRange } from "../data/date-time";

import Day from "./DateRangePickerDay";
import type { DayMarkings, CalendarDay } from "./DateRangePickerDay";

const getSortedDateRange = (dates: DateRange) =>
  isBefore(dates.endDate, dates.startDate)
    ? { startDate: dates.endDate, endDate: dates.startDate }
    : dates;

const getMarkedDate = (date: string): DayMarkings => ({
  [date]: {
    selected: true,
    startingDay: true,
    endingDay: true
  }
});

const getMarkedDateRange = (dateRange: DateRange): DayMarkings => {
  const { startDate, endDate } = dateRange;
  const markedDates = {};

  // Start
  markedDates[startDate] = {
    selected: true,
    startingDay: true
  };

  // In between
  let inBetweenDate = startDate;
  do {
    inBetweenDate = formatDate(addDays(inBetweenDate, 1), "YYYY-MM-DD");
    markedDates[inBetweenDate] = { selected: true };
  } while (inBetweenDate !== endDate);

  // End
  markedDates[endDate] = {
    selected: true,
    endingDay: true
  };

  return markedDates;
};

const addDateMark = (markings: DayMarkings, today: string): DayMarkings => {
  const todayMark = markings[today] || {};

  return {
    ...markings,
    [today]: {
      ...todayMark,
      marked: true
    }
  };
};

const getMarkedDates = (dateRange: ?DateRange, today: string): DayMarkings => {
  if (!dateRange) {
    return addDateMark({}, today);
  }

  if (dateRange.startDate === dateRange.endDate) {
    return addDateMark(getMarkedDate(dateRange.startDate), today);
  }

  return addDateMark(getMarkedDateRange(dateRange), today);
};

type Props = {
  onChange: DateRange => void,
  dateRange?: ?DateRange,
  today: Date,
  forceNewRange: boolean
};

class DateRangePicker extends React.PureComponent<Props> {
  static defaultProps = {
    today: new Date()
  };

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
        markedDates={getMarkedDates(
          dateRange,
          formatDate(this.props.today, "YYYY-MM-DD")
        )}
        markingType="period"
        onDayPress={this.onDaySelected}
        dayComponent={Day}
        hideExtraDays={true}
      />
    );
  }
}

export default DateRangePicker;
