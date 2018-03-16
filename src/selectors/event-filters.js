// @flow
import areRangesOverlapping from "date-fns/are_ranges_overlapping";
import endOfDay from "date-fns/end_of_day";
import getHours from "date-fns/get_hours";
import startOfDay from "date-fns/start_of_day";
import type { Event } from "../data/event";
import type { DateOrDateRange, DateRange, Time } from "../data/date-time";
import type { State } from "../reducers";

const locale = "en-GB";

const getEventFiltersState = (state: State) => state.eventFilters;

export const selectDateFilter = (state: State) =>
  getEventFiltersState(state).date;
export const selectTimeFilter = (state: State) =>
  getEventFiltersState(state).time;

export const buildDateFilter = (date: string) => (event: Event) =>
  areRangesOverlapping(
    startOfDay(date),
    endOfDay(date),
    event.fields.startTime[locale],
    event.fields.endTime[locale]
  );

export const buildDateRangeFilter = (date: DateRange) => (event: Event) =>
  areRangesOverlapping(
    startOfDay(date.startDate),
    endOfDay(date.endDate),
    event.fields.startTime[locale],
    event.fields.endTime[locale]
  );

export const buildDateOrDateRangeFilter = (date: DateOrDateRange) =>
  typeof date === "string" ? buildDateFilter(date) : buildDateRangeFilter(date);

export const buildTimeFilter = (time: Time[]) => (event: Event) =>
  (time.includes("morning") && getHours(event.fields.startTime[locale]) < 12) ||
  (time.includes("afternoon") &&
    (getHours(event.fields.startTime[locale]) < 18 &&
      getHours(event.fields.endTime[locale]) > 12)) ||
  (time.includes("evening") && getHours(event.fields.endTime[locale]) >= 18);

export const buildEventFilter = (state: State) => {
  const { date, time } = getEventFiltersState(state);
  const dateFilter: (event: Event) => boolean = date
    ? buildDateOrDateRangeFilter(date)
    : () => true;
  const timeFilter = buildTimeFilter(time);

  return (event: Event) => dateFilter(event) && timeFilter(event);
};
