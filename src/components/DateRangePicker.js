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

type Props = {
  onChange: DateOrDateRange => void,
  dateRange?: ?DateOrDateRange
};

class DateRangePicker extends React.PureComponent<Props> {
  onDaySelected = (day: CalendarDay) => {
    const { dateRange, onChange } = this.props;
    if (!dateRange) {
      onChange(day.dateString);
    } else if (typeof dateRange === "string") {
      onChange(
        getSortedDateRange({
          startDate: dateRange,
          endDate: day.dateString
        })
      );
    } else {
      onChange(
        getSortedDateRange({
          ...dateRange,
          endDate: day.dateString
        })
      );
    }
  };

  render() {
    const dateRange =
      this.props.dateRange && typeof this.props.dateRange === "object"
        ? getSortedDateRange(this.props.dateRange)
        : this.props.dateRange;

    const markedDates = {};
    let markingType;
    if (dateRange && typeof dateRange === "string") {
      markingType = "simple";
      markedDates[dateRange] = {
        selected: true,
        selectedColor: eventListHeaderColor
      };
    } else if (dateRange && typeof dateRange === "object") {
      const { startDate, endDate } = dateRange;

      markingType = "period";
      const template = {
        color: eventListHeaderColor,
        textColor: cardBgColor
      };

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
    }

    return (
      <Calendar
        markedDates={markedDates}
        markingType={markingType}
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
