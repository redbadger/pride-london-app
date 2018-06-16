// @flow
import React from "react";
import { CalendarList } from "react-native-calendars";
import Day from "./DateRangePickerDay";
import type { DayMarkings, CalendarDay } from "./DateRangePickerDay";
import type { DateRange } from "../../data/date-time";
import { scaleFont } from "../../components/Text";
import {
  toLondonFormat as formatDate,
  isBefore,
  addDays,
  FORMAT_YEAR_MONTH_DAY
} from "../../lib/date";
import {
  dateRangePickerTextColor,
  lightNavyBlueColor
} from "../../constants/colors";

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
    inBetweenDate = formatDate(
      addDays(inBetweenDate, 1),
      FORMAT_YEAR_MONTH_DAY
    );
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

const diffFullMonths = (a: Date, b: Date) =>
  12 * (a.getFullYear() - b.getFullYear()) + a.getMonth() - b.getMonth();

type Props = {
  onChange: DateRange => void,
  dateRange?: ?DateRange,
  today?: Date,
  forceNewRange: boolean
};

class DateRangePicker extends React.PureComponent<Props> {
  static defaultProps = {
    dateRange: undefined,
    today: undefined
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
    const today = this.props.today || new Date();
    const dateRange = this.props.dateRange
      ? getSortedDateRange(this.props.dateRange)
      : this.props.dateRange;
    const current =
      dateRange && this.props.forceNewRange ? dateRange.startDate : null;
    const pastScrollRange = diffFullMonths(
      current ? new Date(current) : today,
      today
    );

    return (
      <CalendarList
        current={current}
        markedDates={getMarkedDates(
          dateRange,
          formatDate(today.toISOString(), FORMAT_YEAR_MONTH_DAY)
        )}
        markingType="period"
        onDayPress={this.onDaySelected}
        dayComponent={Day}
        hideExtraDays
        theme={calendarTheme}
        showScrollIndicator
        pastScrollRange={pastScrollRange}
        futureScrollRange={12}
        calendarHeight={365}
      />
    );
  }
}

const calendarTheme = {
  "stylesheet.calendar.main": {
    week: {
      marginTop: 7,
      marginBottom: 7,
      flexDirection: "row",
      justifyContent: "space-around"
    }
  },
  "stylesheet.calendar.header": {
    monthText: {
      fontFamily: "Poppins-SemiBold",
      fontSize: scaleFont("h2", 18),
      lineHeight: scaleFont("h2", 24),
      marginVertical: 10,
      color: lightNavyBlueColor
    },
    week: {
      marginTop: 7,
      flexDirection: "row",
      justifyContent: "space-around"
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: 7,
      width: 32,
      textAlign: "center",
      fontSize: 14,
      fontFamily: "Roboto",
      color: dateRangePickerTextColor
    }
  }
};

export default DateRangePicker;
