// @flow
import {
  buildDateFilter,
  buildDateRangeFilter,
  buildTimeFilter
} from "./basic-event-filters";
import type { Event } from "../data/event";
import type { DateOrDateRange, Time } from "../data/date-time";
import type { State } from "../reducers";

const getEventFiltersState = (state: State) => state.eventFilters;

export const selectDateFilter = (state: State) =>
  getEventFiltersState(state).date;
export const selectTimeFilter = (state: State) =>
  getEventFiltersState(state).time;

const buildDateOrDateRangeFilter = (date: DateOrDateRange) =>
  typeof date === "string" ? buildDateFilter(date) : buildDateRangeFilter(date);

const buildTimesFilter = (times: Time[]) => {
  const filters = times.map(time => buildTimeFilter(time));
  return (event: Event) => filters.some(filter => filter(event));
};

export const buildEventFilter = (state: State) => {
  const { date, time } = getEventFiltersState(state);
  const timeArray = Array.from(time);
  const dateFilter: (event: Event) => boolean = date
    ? buildDateOrDateRangeFilter(date)
    : () => true;
  const timeFilter: (event: Event) => boolean =
    timeArray.length > 0 && timeArray.length < 3
      ? buildTimesFilter(timeArray)
      : () => true;

  return (event: Event) => dateFilter(event) && timeFilter(event);
};
